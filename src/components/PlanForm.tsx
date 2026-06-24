"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PlanForm({
  initialDate,
  initialTarget,
  goalDefault,
}: {
  initialDate: string | null;
  initialTarget: number;
  goalDefault: number;
}) {
  const router = useRouter();
  const [date, setDate] = useState(initialDate ?? "");
  const [target, setTarget] = useState(initialTarget || goalDefault);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(!initialDate);

  const today = new Date().toISOString().slice(0, 10);

  async function save(clear = false) {
    setSaving(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examDate: clear ? null : date || null,
          targetScore: clear ? null : Number(target),
        }),
      });
      if (res.ok) {
        setOpen(false);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button className="btn-secondary" onClick={() => setOpen(true)}>
        ✏️ Editar fecha y meta
      </button>
    );
  }

  return (
    <div className="card">
      <h2 className="mb-3 text-lg font-semibold">Tu examen y tu meta</h2>
      <label className="mb-1 block text-sm font-medium">Fecha del examen</label>
      <input
        type="date"
        min={today}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input mb-4"
      />
      <label className="mb-1 block text-sm font-medium">
        Puntaje meta (ITP): <span className="font-bold text-brand-600">{target}</span>
      </label>
      <input
        type="range"
        min={310}
        max={677}
        step={1}
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        className="mb-4 w-full"
      />
      <div className="flex flex-wrap gap-2">
        <button
          className="btn-primary"
          disabled={!date || saving}
          onClick={() => save(false)}
        >
          {saving ? "Guardando..." : "Guardar plan"}
        </button>
        {initialDate && (
          <button className="btn-ghost" disabled={saving} onClick={() => save(true)}>
            Quitar plan
          </button>
        )}
      </div>
    </div>
  );
}
