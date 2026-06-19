import { PrismaClient } from "@prisma/client";
import { allLessons } from "../src/content";
import { levelExams } from "../src/content/exams";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding lecciones...");
  for (const lesson of allLessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: {
        level: lesson.level,
        order: lesson.order,
        title: lesson.title,
        area: lesson.area,
        type: lesson.type,
        content: JSON.stringify(lesson.content),
      },
      create: {
        id: lesson.id,
        level: lesson.level,
        order: lesson.order,
        title: lesson.title,
        area: lesson.area,
        type: lesson.type,
        content: JSON.stringify(lesson.content),
      },
    });
  }
  console.log(`  ${allLessons.length} lecciones listas.`);

  console.log("Seeding exámenes de nivel...");
  for (const exam of levelExams) {
    await prisma.levelExam.upsert({
      where: { level: exam.level },
      update: {
        title: exam.title,
        passThreshold: exam.passThreshold,
        items: JSON.stringify(exam.items),
      },
      create: {
        level: exam.level,
        title: exam.title,
        passThreshold: exam.passThreshold,
        items: JSON.stringify(exam.items),
      },
    });
  }
  console.log(`  ${levelExams.length} exámenes listos.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completado.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
