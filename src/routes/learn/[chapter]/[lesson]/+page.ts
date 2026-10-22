import { error } from '@sveltejs/kit';
import { getLesson, allLessons } from '#lib/content/chapters.js';
import { lessonLoaders, quizFor } from '#lib/content/registry.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	allLessons
		.filter((l) => l.id in lessonLoaders)
		.map((l) => ({ chapter: l.chapter.id, lesson: l.lesson.slug }));

export const load: PageLoad = async ({ params }) => {
	const found = getLesson(params.chapter, params.lesson);
	const loader = found && lessonLoaders[found.id];
	if (!found || !loader) error(404, 'Lesson not found');
	const mod = await loader();
	const idx = allLessons.findIndex((l) => l.id === found.id);
	return {
		meta: found,
		Content: mod.default,
		questions: quizFor(found.id),
		prev: idx > 0 ? allLessons[idx - 1] : null,
		next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null
	};
};
