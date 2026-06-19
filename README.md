# Columnas — Inglés para el TOEFL ITP

Aplicación web full-stack para aprender inglés desde un nivel básico hasta un
**A2 sólido (meta: 400+ en el TOEFL ITP)**, con margen hacia B1. Organiza el
aprendizaje por niveles alineados a las bandas de puntaje del ITP, inicia con
una **evaluación diagnóstica** que ubica al usuario, persiste el progreso y
exige **exámenes de fin de nivel** para desbloquear el siguiente.

> El contenido es **original**. No reproduce preguntas ni materiales oficiales
> de ETS / TOEFL; solo imita el **formato y nivel** de las tres secciones del
> examen (Listening, Structure & Written Expression, Reading).

## Stack

- **Next.js 14 (App Router) + React + TypeScript**
- **Tailwind CSS** (modo claro/oscuro)
- **Prisma ORM + SQLite**
- **Autenticación JWT propia** (cookie httpOnly) con `bcryptjs`
- **Web Speech API** (SpeechSynthesis) para el audio de listening
- **API de Anthropic (Claude)** opcional para retroalimentación de escritura

## Puesta en marcha

```bash
npm install            # instala dependencias y genera el cliente Prisma
npm run db:push        # crea la base de datos SQLite (prisma/dev.db)
npm run db:seed        # carga lecciones y exámenes de los 5 niveles
npm run dev            # http://localhost:3000
```

Atajo para reconstruir la BD desde cero: `npm run db:reset`.

### Variables de entorno (`.env`)

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="<secreto largo y aleatorio>"
ANTHROPIC_API_KEY=""      # opcional; activa la retroalimentación con IA
ANTHROPIC_MODEL=""        # opcional; por defecto claude-sonnet-4-6
```

La app funciona completamente **sin** `ANTHROPIC_API_KEY`; solo la práctica de
escritura con retroalimentación de IA queda deshabilitada con un aviso claro.

## Sistema de niveles

| Nivel | Nombre | Banda ITP | MCER |
|------|--------|-----------|------|
| 1 | Fundamentos | ~310–336 | A1 |
| 2 | Básico | ~337–390 | A2 inicial |
| 3 | Pre-intermedio | ~391–430 (**meta 400**) | A2 consolidado |
| 4 | Intermedio bajo | ~431–490 | A2 alto / B1 inicial |
| 5 | Intermedio | ~491–542 | B1 |

Niveles 1–3 traen contenido completo y usable; 4–5 incluyen contenido de
muestra ampliable. La meta de 400 se alcanza al aprobar el Nivel 3.

## Métodos de aprendizaje (basados en evidencia)

- **Repetición espaciada (SRS):** SM-2 simplificado con intervalos 1/3/7/16/35
  días (`src/lib/srs.ts`). El panel muestra los repasos pendientes de hoy.
- **Práctica intercalada (interleaving):** los repasos mezclan áreas
  (vocabulario + gramática + …) en vez de bloques homogéneos.
- **Recuperación activa:** quizzes y producción por encima de la relectura.
- **Feedback inmediato y específico** en cada ítem.
- **Input comprensible (i+1):** material nuevo justo por encima del nivel
  dominado.

## Estructura del proyecto

```
prisma/
  schema.prisma          # modelo de datos
  seed.ts                # carga lecciones y exámenes
src/
  app/                   # páginas (App Router) y rutas API
    api/                 # auth, placement, lessons, srs, exam, ai
    dashboard, lesson, placement, review, exam, practice/writing
  components/            # UI (ActivityCard, LessonPlayer, ExamRunner, ...)
  content/               # contenido del currículo (separado de la lógica)
    level1..5.ts, placement.ts, exams.ts
  lib/                   # auth, prisma, itp, srs, progress, dashboard, ai
  middleware.ts          # protección de rutas
```

El contenido vive en `src/content/` como datos TypeScript, separado de la
lógica, para ampliarlo fácilmente.

## Flujo de usuario

1. **Registro / login** (sesión persistente 30 días).
2. **Diagnóstica semi-adaptativa** → ubica en el nivel 1–5 con justificación y
   puntaje ITP estimado.
3. **Lecciones** (input → recuperación activa → mini-tarea de salida) con
   feedback inmediato; al completarlas se siembran ítems al SRS.
4. **Repasos diarios** intercalados (SRS).
5. **Examen de nivel** (umbral 70%): al aprobar desbloquea el siguiente nivel;
   al reprobar reinyecta los ítems del nivel al repaso.
6. **Dashboard**: puntaje estimado, barra hacia 400, racha, dominio por área e
   historial de exámenes.

## Tipos de actividad

Tarjetas de vocabulario (SRS) · opción múltiple de gramática · identificación de
error (Structure & Written Expression) · comprensión lectora · listening con voz
sintetizada · ordenar palabras · emparejar · dictado.
