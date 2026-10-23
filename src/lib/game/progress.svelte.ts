import { allLessons } from '#lib/content/chapters.js';
import { isReady } from '#lib/content/registry.js';
import {
	XP,
	courseMastery,
	dayKey,
	gradeReview,
	isDue,
	levelFor,
	liveStreak,
	practiceLevel,
	reviewLevel,
	testLevel,
	touchStreak,
	type Mastery,
	type ReviewState,
	type Streak
} from './engine.js';
import { BADGES, type BadgeDef } from './badges.js';

const browser = typeof window !== 'undefined';
const KEY = 'la-notes-progress-v2';

export interface SkillRecord {
	level: Mastery;
	attempts: number;
}

export interface ProgressData {
	version: 2;
	/** coins */
	xp: number;
	streak: Streak;
	/** lesson id -> skill mastery */
	lessons: Record<string, SkillRecord>;
	/** question id -> times answered right/wrong */
	answers: Record<string, { right: number; wrong: number }>;
	review: Record<string, ReviewState>;
	badges: Record<string, string>;
	/** ids of the notes' exercises you have solved */
	exercises: Record<string, true>;
}

export interface LevelChange {
	lessonId: string;
	from: Mastery;
	to: Mastery;
}

/** "ch01.span.3" -> "ch01.span" */
export const skillOf = (questionId: string): string => questionId.split('.').slice(0, 2).join('.');

const fresh = (): ProgressData => ({
	version: 2,
	xp: 0,
	streak: { count: 0, last: null, best: 0 },
	lessons: {},
	answers: {},
	review: {},
	badges: {},
	exercises: {}
});

function load(): ProgressData {
	if (!browser) return fresh();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return fresh();
		const parsed = JSON.parse(raw);
		return parsed?.version === 2 ? { ...fresh(), ...parsed } : fresh();
	} catch {
		return fresh();
	}
}

class ProgressStore {
	data = $state<ProgressData>(fresh());
	ready = $state(false);
	/** badges unlocked this visit, shown as toasts */
	fresh = $state<BadgeDef[]>([]);

	init() {
		if (this.ready) return;
		this.data = load();
		this.ready = true;
	}

	#save() {
		if (!browser) return;
		try {
			localStorage.setItem(KEY, JSON.stringify(this.data));
		} catch {
			/* storage blocked: keep running in memory */
		}
	}

	#award(coins: number) {
		this.data.xp += coins;
		this.data.streak = touchStreak(this.data.streak, dayKey());
		for (const b of BADGES) {
			if (!this.data.badges[b.id] && b.test(this.data)) {
				this.data.badges[b.id] = dayKey();
				this.fresh.push(b);
			}
		}
		this.#save();
	}

	get level() {
		return levelFor(this.data.xp);
	}
	get streak() {
		return liveStreak(this.data.streak, dayKey());
	}
	get dueReviewIds(): string[] {
		const today = dayKey();
		return Object.entries(this.data.review)
			.filter(([, r]) => isDue(r, today))
			.map(([id]) => id);
	}

	mastery(id: string): Mastery {
		return this.data.lessons[id]?.level ?? 0;
	}

	/** Course mastery 0-1 over the given lessons (default: every lesson that exists). */
	masteryOf(ids: string[]): number {
		return courseMastery(ids.map((id) => this.mastery(id)));
	}
	get readyIds(): string[] {
		return allLessons.filter((l) => isReady(l.id)).map((l) => l.id);
	}
	/** How many of the given lessons sit at each mastery level. */
	counts(ids: string[]): number[] {
		const c = [0, 0, 0, 0, 0];
		for (const id of ids) c[this.mastery(id)]++;
		return c;
	}
	/** First lesson you have not yet reached Proficient in. */
	get next() {
		return allLessons.find((l) => isReady(l.id) && this.mastery(l.id) < 3);
	}

	#setLevel(id: string, to: Mastery): LevelChange {
		const rec = (this.data.lessons[id] ??= { level: 0, attempts: 0 });
		const from = rec.level;
		rec.level = to;
		return { lessonId: id, from, to };
	}

	/** Log one answer and pay coins. Skill levels move separately, per set. */
	answer(questionId: string, correct: boolean, opts: { clean: boolean; mode: 'practice' | 'test' | 'review' }) {
		const a = (this.data.answers[questionId] ??= { right: 0, wrong: 0 });
		if (correct) a.right++;
		else a.wrong++;
		this.data.review[questionId] = gradeReview(
			this.data.review[questionId],
			correct && (opts.clean || opts.mode !== 'practice'),
			dayKey()
		);
		let coins = 0;
		if (correct) {
			coins = opts.mode === 'test' ? XP.testCorrect : opts.mode === 'review' ? XP.reviewCorrect : opts.clean ? XP.firstTryCorrect : XP.retryCorrect;
		}
		let change: LevelChange | null = null;
		if (opts.mode === 'review') {
			const id = skillOf(questionId);
			// exercises from the notes are not tied to a single skill, so only lesson questions move mastery
			if (allLessons.some((l) => l.id === id)) {
				const to = reviewLevel(this.mastery(id), correct);
				change = this.#setLevel(id, to);
				if (to > change.from && to >= 2) coins += XP.levelUp;
			}
		}
		this.#award(coins);
		return { coins, change };
	}

	/** End of a lesson's practice set. */
	finishPractice(lessonId: string, cleanCorrect: number, total: number): LevelChange {
		const rec = (this.data.lessons[lessonId] ??= { level: 0, attempts: 0 });
		rec.attempts++;
		const change = this.#setLevel(lessonId, practiceLevel(rec.level, cleanCorrect, total));
		this.#award(change.to > change.from && change.to >= 2 ? XP.levelUp : 0);
		return change;
	}

	/** End of a unit test / course challenge: results grouped per skill. */
	finishTest(results: { lessonId: string; correct: boolean }[]): LevelChange[] {
		const by = new Map<string, { c: number; n: number }>();
		for (const r of results) {
			const e = by.get(r.lessonId) ?? { c: 0, n: 0 };
			e.n++;
			if (r.correct) e.c++;
			by.set(r.lessonId, e);
		}
		const changes: LevelChange[] = [];
		let bonus = 0;
		for (const [id, { c, n }] of by) {
			const ch = this.#setLevel(id, testLevel(this.mastery(id), c, n));
			if (ch.to > ch.from && ch.to >= 2) bonus += XP.levelUp;
			changes.push(ch);
		}
		this.#award(bonus);
		return changes;
	}

	/** Record that a notes exercise was solved (self-graded for proofs). */
	markExercise(id: string) {
		this.data.exercises[id] = true;
		this.#save();
	}
	exercisesDone(ids: string[]): number {
		return ids.filter((id) => this.data.exercises[id]).length;
	}

	dismissFresh() {
		this.fresh = [];
	}

	export(): string {
		return JSON.stringify(this.data, null, 2);
	}
	import(json: string): boolean {
		try {
			const parsed = JSON.parse(json);
			if (parsed?.version !== 2) return false;
			this.data = { ...fresh(), ...parsed };
			this.#save();
			return true;
		} catch {
			return false;
		}
	}
	reset() {
		this.data = fresh();
		this.#save();
	}
}

export const progress = new ProgressStore();
