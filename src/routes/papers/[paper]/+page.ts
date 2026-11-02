import { error } from '@sveltejs/kit';
import { getPaper, papers } from '#lib/content/papers.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => papers.map((p) => ({ paper: p.id }));

export const load: PageLoad = ({ params }) => {
	const paper = getPaper(params.paper);
	if (!paper) error(404, 'No such paper');
	return { paper };
};
