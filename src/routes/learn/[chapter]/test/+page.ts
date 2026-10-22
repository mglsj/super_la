import { error } from '@sveltejs/kit';
import { chapters, lessonId } from '#lib/content/chapters.js';
import { isReady } from '#lib/content/registry.js';
import type { EntryGenerator, PageLoad } from './$types';

const readyIds = (chapterId: string) =>
	(chapters.find((c) => c.id === chapterId)?.lessons ?? [])
		.map((l) => lessonId(chapterId, l.slug))
		.filter(isReady);

export const entries: EntryGenerator = () =>
	chapters.filter((c) => readyIds(c.id).length > 0).map((c) => ({ chapter: c.id }));

export const load: PageLoad = ({ params }) => {
	const chapter = chapters.find((c) => c.id === params.chapter);
	const ids = readyIds(params.chapter);
	if (!chapter || ids.length === 0) error(404, 'No test for this unit yet');
	return { chapter, lessonIds: ids };
};
