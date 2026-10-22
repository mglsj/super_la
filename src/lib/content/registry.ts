import type { Component } from 'svelte';
import { allLessons } from './chapters';
import type { Question } from './types';
import { ch01 } from './quizzes/ch01';
import { ch02 } from './quizzes/ch02';
import { ch03 } from './quizzes/ch03';
import { ch04 } from './quizzes/ch04';
import { ch05 } from './quizzes/ch05';
import { ch06 } from './quizzes/ch06';
import { ch07 } from './quizzes/ch07';
import { ch08 } from './quizzes/ch08';
import { ch09 } from './quizzes/ch09';
import { ch10 } from './quizzes/ch10';
import { ch11 } from './quizzes/ch11';
import { ch12 } from './quizzes/ch12';
import { ch13 } from './quizzes/ch13';
import { ch14 } from './quizzes/ch14';
import { ch15 } from './quizzes/ch15';
import { ch16 } from './quizzes/ch16';
import { ch17 } from './quizzes/ch17';
import { ch18 } from './quizzes/ch18';
import { ch19 } from './quizzes/ch19';
import { ch20 } from './quizzes/ch20';
import { ch21 } from './quizzes/ch21';
import { ch22 } from './quizzes/ch22';
import { ch23 } from './quizzes/ch23';
import { ch24 } from './quizzes/ch24';
import { hints } from './quizzes/hints';

/** Lesson components are discovered from files: content/lessons/<chapter>/<slug>.svelte */
const modules = import.meta.glob<{ default: Component }>('./lessons/*/*.svelte');

export const lessonLoaders: Record<string, () => Promise<{ default: Component }>> = {};
for (const [path, loader] of Object.entries(modules)) {
	const m = path.match(/\.\/lessons\/([^/]+)\/([^/]+)\.svelte$/);
	if (m) lessonLoaders[`${m[1]}.${m[2]}`] = loader;
}

export const isReady = (id: string): boolean => id in lessonLoaders;

const withHints = (qs: Question[]): Question[] =>
	qs.map((q) => (hints[q.id] ? { ...q, hint: hints[q.id] } : q));

const banks: Record<string, Question[]> = Object.fromEntries(
	Object.entries({ ...ch01, ...ch02, ...ch03, ...ch04, ...ch05, ...ch06, ...ch07, ...ch08, ...ch09, ...ch10, ...ch11, ...ch12, ...ch13, ...ch14, ...ch15, ...ch16, ...ch17, ...ch18, ...ch19, ...ch20, ...ch21, ...ch22, ...ch23, ...ch24 }).map(([id, qs]) => [id, withHints(qs)])
);

export const quizFor = (lessonId: string): Question[] => banks[lessonId] ?? [];

export const questionIndex: Record<string, Question> = Object.fromEntries(
	Object.values(banks)
		.flat()
		.map((q) => [q.id, q])
);

function shuffle<T>(xs: T[]): T[] {
	const a = [...xs];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/**
 * Pick questions for a unit test or course challenge: up to `perSkill` from each lesson,
 * shuffled together, capped at `max`.
 */
export function buildTest(lessonIds: string[], perSkill: number, max = 30): Question[] {
	const picked = lessonIds.flatMap((id) => shuffle(quizFor(id)).slice(0, perSkill));
	return shuffle(picked).slice(0, max);
}

export const readyLessons =allLessons.filter((l) => isReady(l.id));
