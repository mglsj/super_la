import { papers } from '#lib/content/papers.js';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ papers });
