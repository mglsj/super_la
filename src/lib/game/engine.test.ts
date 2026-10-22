import { describe, expect, it } from 'vitest';
import {
	addDays,
	gradeReview,
	isDue,
	levelFor,
	levelThreshold,
	liveStreak,
	practiceLevel,
	reviewLevel,
	testLevel,
	courseMastery,
	touchStreak
} from './engine';

describe('levels', () => {
	it('thresholds grow and levelFor inverts them', () => {
		expect(levelThreshold(1)).toBe(0);
		expect(levelThreshold(2)).toBe(100);
		expect(levelFor(0).level).toBe(1);
		expect(levelFor(99).level).toBe(1);
		expect(levelFor(100).level).toBe(2);
		expect(levelFor(299).level).toBe(2);
		expect(levelFor(300).level).toBe(3);
		expect(levelFor(150)).toEqual({ level: 2, into: 50, span: 200 });
	});
});

describe('streak', () => {
	const fresh = { count: 0, last: null, best: 0 };
	it('starts, continues, repeats and resets', () => {
		let s = touchStreak(fresh, '2026-10-22');
		expect(s.count).toBe(1);
		expect(touchStreak(s, '2026-10-22')).toBe(s);
		s = touchStreak(s, '2026-10-23');
		expect(s.count).toBe(2);
		s = touchStreak(s, '2026-10-26');
		expect(s.count).toBe(1);
		expect(s.best).toBe(2);
	});
	it('handles month boundaries', () => {
		const s = touchStreak({ count: 3, last: '2026-10-31', best: 3 }, '2026-11-01');
		expect(s.count).toBe(4);
		expect(addDays('2026-02-28', 1)).toBe('2026-03-01');
	});
	it('lapsed streaks show as zero', () => {
		const s = { count: 5, last: '2026-10-20', best: 5 };
		expect(liveStreak(s, '2026-10-21')).toBe(5);
		expect(liveStreak(s, '2026-10-22')).toBe(0);
	});
});

describe('mastery', () => {
	it('practice raises levels by accuracy and never lowers them', () => {
		expect(practiceLevel(0, 4, 5)).toBe(3);
		expect(practiceLevel(0, 3, 4)).toBe(3);
		expect(practiceLevel(0, 2, 4)).toBe(2);
		expect(practiceLevel(0, 0, 4)).toBe(1);
		expect(practiceLevel(4, 0, 4)).toBe(4);
		expect(practiceLevel(3, 2, 4)).toBe(3);
	});
	it('tests move skills up and down', () => {
		expect(testLevel(2, 2, 2)).toBe(3);
		expect(testLevel(3, 2, 2)).toBe(4);
		expect(testLevel(4, 1, 2)).toBe(3);
		expect(testLevel(3, 0, 2)).toBe(2);
		expect(testLevel(0, 0, 2)).toBe(1);
		expect(testLevel(1, 0, 2)).toBe(1);
	});
	it('review promotes proficient to mastered and demotes on a miss', () => {
		expect(reviewLevel(3, true)).toBe(4);
		expect(reviewLevel(3, false)).toBe(2);
		expect(reviewLevel(2, true)).toBe(2);
		expect(reviewLevel(0, true)).toBe(1);
	});
	it('course mastery weights levels', () => {
		expect(courseMastery([])).toBe(0);
		expect(courseMastery([4, 4])).toBe(1);
		expect(courseMastery([3, 0])).toBeCloseTo(0.4);
	});
});

describe('review', () => {
	it('climbs boxes on success and resets on failure', () => {
		let r = gradeReview(undefined, true, '2026-10-22');
		expect(r).toEqual({ box: 1, due: '2026-10-23' });
		r = gradeReview(r, true, '2026-10-23');
		expect(r).toEqual({ box: 2, due: '2026-10-26' });
		r = gradeReview(r, false, '2026-10-26');
		expect(r).toEqual({ box: 0, due: '2026-10-26' });
		expect(isDue(r, '2026-10-26')).toBe(true);
		expect(isDue({ box: 2, due: '2026-10-30' }, '2026-10-26')).toBe(false);
	});
});
