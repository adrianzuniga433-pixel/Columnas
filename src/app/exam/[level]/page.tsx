import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensureProgress } from "@/lib/progress";
import { ExamRunner } from "@/components/ExamRunner";
import type { ExamItem } from "@/content/types";

export default async function ExamPage({
  params,
}: {
  params: { level: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const level = parseInt(params.level, 10);
  if (Number.isNaN(level)) notFound();

  const progress = await ensureProgress(session.userId);
  if (level > progress.unlockedLevel) redirect("/dashboard");

  const exam = await prisma.levelExam.findUnique({ where: { level } });
  if (!exam) notFound();

  const items = JSON.parse(exam.items) as ExamItem[];

  // Quita las claves de respuesta antes de enviar al cliente.
  const sanitized = items.map((item) => {
    const q = item.question;
    if (q.kind === "mcq") {
      return {
        area: item.area,
        kind: "mcq" as const,
        prompt: q.prompt,
        sentence: q.sentence,
        options: q.options,
      };
    }
    if (q.kind === "error-id") {
      return {
        area: item.area,
        kind: "error-id" as const,
        prompt: q.prompt,
        segments: q.segments,
      };
    }
    if (q.kind === "reading") {
      return {
        area: item.area,
        kind: "reading" as const,
        title: q.title,
        passage: q.passage,
        questions: q.questions.map((x) => ({ prompt: x.prompt, options: x.options })),
      };
    }
    return {
      area: item.area,
      kind: "listening" as const,
      scriptLabel: q.scriptLabel,
      script: q.script,
      questions: q.questions.map((x) => ({ prompt: x.prompt, options: x.options })),
    };
  });

  return <ExamRunner level={level} title={exam.title} items={sanitized} />;
}
