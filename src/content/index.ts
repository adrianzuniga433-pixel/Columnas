import { level1Lessons, level1Srs } from "./level1";
import { level2Lessons, level2Srs } from "./level2";
import { level3Lessons, level3Srs } from "./level3";
import { level4Lessons, level4Srs } from "./level4";
import { level5Lessons, level5Srs } from "./level5";
import type { LessonDef, SeedSrsItem } from "./types";

export const allLessons: LessonDef[] = [
  ...level1Lessons,
  ...level2Lessons,
  ...level3Lessons,
  ...level4Lessons,
  ...level5Lessons,
];

const srsByLevel: Record<number, SeedSrsItem[]> = {
  1: level1Srs,
  2: level2Srs,
  3: level3Srs,
  4: level4Srs,
  5: level5Srs,
};

export function lessonsForLevel(level: number): LessonDef[] {
  return allLessons
    .filter((l) => l.level === level)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): LessonDef | undefined {
  return allLessons.find((l) => l.id === id);
}

export function srsSeedForLevel(level: number): SeedSrsItem[] {
  return srsByLevel[level] ?? [];
}

export { levelExams } from "./exams";
export { placementItems } from "./placement";
export type { LessonDef, SeedSrsItem } from "./types";
