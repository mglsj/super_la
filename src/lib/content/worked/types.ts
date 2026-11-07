/** Props for the WorkedExample lesson component: an exam-style problem solved one step at a time. */
export interface Worked {
	title: string;
	problem: string;
	steps: { label: string; text: string }[];
	method?: string[];
	credit?: string;
}
