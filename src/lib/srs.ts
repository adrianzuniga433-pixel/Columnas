// Sistema de Repetición Espaciada — SM-2 simplificado con intervalos fijos
// de respaldo (1, 3, 7, 16, 35 días) como pide el objetivo del proyecto.

export const SRS_INTERVALS = [1, 3, 7, 16, 35] as const;

export interface SrsState {
  interval: number;
  easeFactor: number;
  repetitions: number;
  lapses: number;
  nextReviewAt: Date;
}

/**
 * Calcula el nuevo estado de un ítem tras una respuesta.
 * @param prev estado previo
 * @param correct si la respuesta fue correcta
 * @param quality calidad subjetiva 0..5 (por defecto 5 si correcto, 1 si no)
 */
export function reviewItem(
  prev: Pick<SrsState, "interval" | "easeFactor" | "repetitions" | "lapses">,
  correct: boolean,
  quality?: number
): SrsState {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const q = quality ?? (correct ? 5 : 1);

  if (!correct) {
    // Falla: vuelve al inicio del ciclo (Leitner-style) y baja el ease.
    const easeFactor = Math.max(1.3, prev.easeFactor - 0.2);
    const interval = SRS_INTERVALS[0];
    return {
      interval,
      easeFactor,
      repetitions: 0,
      lapses: prev.lapses + 1,
      nextReviewAt: new Date(now + interval * dayMs),
    };
  }

  // Acierto: avanza por la escala de intervalos.
  const repetitions = prev.repetitions + 1;
  let interval: number;
  if (repetitions <= SRS_INTERVALS.length) {
    interval = SRS_INTERVALS[repetitions - 1];
  } else {
    // Más allá de la escala fija, usa el factor de facilidad (SM-2).
    interval = Math.round(prev.interval * prev.easeFactor);
  }

  // Ajuste suave del ease factor según la calidad (SM-2).
  const easeFactor = Math.max(
    1.3,
    prev.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  );

  return {
    interval,
    easeFactor,
    repetitions,
    lapses: prev.lapses,
    nextReviewAt: new Date(now + interval * dayMs),
  };
}

/**
 * Mezcla intercalada (interleaving): reordena los ítems de repaso para que no
 * queden agrupados por área, alternando tipos siempre que sea posible.
 */
export function interleave<T extends { area: string }>(items: T[]): T[] {
  const buckets = new Map<string, T[]>();
  for (const item of items) {
    const arr = buckets.get(item.area) ?? [];
    arr.push(item);
    buckets.set(item.area, arr);
  }
  const queues = Array.from(buckets.values());
  const result: T[] = [];
  let remaining = items.length;
  let i = 0;
  while (remaining > 0) {
    const queue = queues[i % queues.length];
    if (queue.length > 0) {
      result.push(queue.shift()!);
      remaining--;
    }
    i++;
  }
  return result;
}
