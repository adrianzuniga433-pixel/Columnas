// Clases de un botón de opción de examen. Compartidas por ExamRunner y MockExam
// (antes estaban duplicadas byte a byte en ambos).
export function optionButtonClass(selected: boolean): string {
  return `w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900 ${
    selected
      ? "border-brand-500 bg-brand-50 dark:bg-brand-950 dark:border-brand-500"
      : "border-slate-300 hover:border-brand-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
  }`;
}
