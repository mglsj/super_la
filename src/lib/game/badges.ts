import type { ProgressData } from './progress.svelte.js';
import { chapters, lessonId } from '#lib/content/chapters.js';
import type { SpriteName } from '#lib/components/game/sprites.js';

export interface BadgeDef {
	id: string;
	title: string;
	description: string;
	icon: SpriteName;
	test: (p: ProgressData) => boolean;
}

const level = (p: ProgressData, id: string) => p.lessons[id]?.level ?? 0;
const atLeast = (p: ProgressData, n: number) =>
	Object.values(p.lessons).filter((l) => l.level >= n).length;
const worldClear = (p: ProgressData, chapterId: string) => {
	const ch = chapters.find((c) => c.id === chapterId);
	return !!ch && ch.lessons.every((l) => level(p, lessonId(ch, l.slug)) >= 3);
};

export const BADGES: BadgeDef[] = [
	{
		id: 'first-coin',
		title: 'First Coin',
		description: 'Try your first practice set.',
		icon: 'coin',
		test: (p) => atLeast(p, 1) >= 1
	},
	{
		id: 'power-up',
		title: 'Power Up',
		description: 'Reach Familiar on any skill.',
		icon: 'mushroom',
		test: (p) => atLeast(p, 2) >= 1
	},
	{
		id: 'fire-flower',
		title: 'Fire Flower',
		description: 'Become Proficient in three skills.',
		icon: 'flower',
		test: (p) => atLeast(p, 3) >= 3
	},
	{
		id: 'super-star',
		title: 'Super Star',
		description: 'Master a skill.',
		icon: 'star',
		test: (p) => atLeast(p, 4) >= 1
	},
	{
		id: 'span-master',
		title: 'Span Master',
		description: 'Become Proficient at span.',
		icon: 'qblock',
		test: (p) => level(p, 'ch01.span') >= 3
	},
	{
		id: 'world-1',
		title: 'World 1 Clear',
		description: 'Proficient in every World 1 skill.',
		icon: 'flag',
		test: (p) => worldClear(p, 'ch01')
	},
	{
		id: 'combo',
		title: '3-Day Combo',
		description: 'Reach a 3-day streak.',
		icon: 'flower',
		test: (p) => p.streak.best >= 3
	},
	{
		id: 'coin-collector',
		title: 'Coin Collector',
		description: 'Collect 500 coins.',
		icon: 'coin',
		test: (p) => p.xp >= 500
	}
];
