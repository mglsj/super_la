/**
 * Pure game rules: XP, levels, streaks, stars and spaced-review scheduling.
 * No browser or Svelte imports so everything here is unit-testable.
 */

/** Coins earned. "XP" in the code is "coins" in the UI. */
export const XP = {
	/** right first time, without a hint */
	firstTryCorrect: 10,
	/** right after a miss or a hint */
	retryCorrect: 4,
	reviewCorrect: 6,
	testCorrect: 8,
	/** bonus each time a skill moves up a mastery level */
	levelUp: 20
} as const;

/**
 * Khan-Academy-style skill mastery.
 * 0 not started, 1 attempted, 2 familiar, 3 proficient, 4 mastered.
 */
export type Mastery = 0 | 1 | 2 | 3 | 4;
export const MASTERY_NAMES = ['Not started', 'Attempted', 'Familiar', 'Proficient', 'Mastered'] as const;
/** share of a skill that counts towards course mastery */
export const MASTERY_WEIGHT = [0, 0, 0.5, 0.8, 1] as const;

/** After a practice set. Practice only ever moves a skill up. */
export function practiceLevel(current: Mastery, cleanCorrect: number, total: number): Mastery {
	const f = total === 0 ? 0 : cleanCorrect / total;
	const earned: Mastery = f >= 0.7 ? 3 : f >= 0.4 ? 2 : 1;
	return Math.max(current, earned) as Mastery;
}

/** After a unit test or course challenge: skills can go up or down. */
export function testLevel(current: Mastery, correct: number, total: number): Mastery {
	const f = total === 0 ? 0 : correct / total;
	if (f >= 0.7) return current >= 3 ? 4 : 3;
	if (f >= 0.4) return (current === 4 ? 3 : Math.max(current, 2)) as Mastery;
	return (current === 0 ? 1 : Math.max(1, current - 1)) as Mastery;
}

/** After one spaced-review question on the skill. */
export function reviewLevel(current: Mastery, correct: boolean): Mastery {
	if (correct) return current === 3 ? 4 : (Math.max(current, 1) as Mastery);
	return current >= 3 ? 2 : (Math.max(current, 1) as Mastery);
}

/** 0-1 share of mastery across a set of skill levels. */
export function courseMastery(levels: Mastery[]): number {
	if (levels.length === 0) return 0;
	return levels.reduce<number>((s, l) => s + MASTERY_WEIGHT[l], 0) / levels.length;
}

/** XP needed to reach level n (level 1 starts at 0). */
export const levelThreshold = (n: number): number => 50 * n * (n - 1);

export function levelFor(xp: number): { level: number; into: number; span: number } {
	let level = 1;
	while (xp >= levelThreshold(level + 1)) level++;
	const base = levelThreshold(level);
	return { level, into: xp - base, span: levelThreshold(level + 1) - base };
}

/** Local calendar day as YYYY-MM-DD. */
export const dayKey = (d: Date = new Date()): string =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dayNumber = (key: string): number => {
	const [y, m, d] = key.split('-').map(Number);
	return Math.round(Date.UTC(y, m - 1, d) / 86_400_000);
};
export const daysBetween = (from: string, to: string): number => dayNumber(to) - dayNumber(from);
export const addDays = (key: string, n: number): string => {
	const t = new Date((dayNumber(key) + n) * 86_400_000);
	return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`;
};

export interface Streak {
	count: number;
	last: string | null;
	best: number;
}

/** Register activity on `today`. Same day: no change. Next day: +1. Gap: restart at 1. */
export function touchStreak(s: Streak, today: string): Streak {
	if (s.last === today) return s;
	const count = s.last !== null && daysBetween(s.last, today) === 1 ? s.count + 1 : 1;
	return { count, last: today, best: Math.max(s.best, count) };
}

/** A streak that has lapsed (missed a whole day) displays as 0. */
export function liveStreak(s: Streak, today: string): number {
	if (s.last === null) return 0;
	return daysBetween(s.last, today) > 1 ? 0 : s.count;
}

/** Leitner boxes: days until the next review for each box. */
export const BOX_DAYS = [0, 1, 3, 7, 14] as const;

export interface ReviewState {
	box: number;
	due: string;
}

export function gradeReview(prev: ReviewState | undefined, correct: boolean, today: string): ReviewState {
	const box = correct ? Math.min((prev?.box ?? 0) + 1, BOX_DAYS.length - 1) : 0;
	return { box, due: addDays(today, BOX_DAYS[box]) };
}

export const isDue = (r: ReviewState, today: string): boolean => daysBetween(r.due, today) >= 0;
