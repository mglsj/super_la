import { error } from '@sveltejs/kit';
import { chapters } from '#lib/content/chapters.js';
import { exercisesFor } from '#lib/content/registry.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	chapters.filter((c) => exercisesFor(c.id).length > 0).map((c) => ({ chapter: c.id }));

export const load: PageLoad = ({ params }) => {
	const chapter = chapters.find((c) => c.id === params.chapter);
	const questions = exercisesFor(params.chapter);
	if (!chapter || questions.length === 0) error(404, 'No exercises for this chapter yet');
	return { chapter, questions };
};
