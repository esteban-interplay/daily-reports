# AGENTS.md

Instrucciones para agentes de código (Cursor, Claude Code, etc.) que trabajan en este repositorio.

## Descripción del proyecto

Aplicación **Next.js** (App Router) para **dashboards ejecutivos** del área de riesgos: informe de usuarios, dispositivos/alertas y vista de **bonos/freespins**. UI en español, datos mayormente **mock** en `lib/*-mock.ts` hasta conectar APIs reales.

Stack principal: **Next 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Recharts**, **Lucide**, utilidades estilo **shadcn** (`components/ui/`, `components.json`).

## Next.js 16 — leer antes de tocar el framework

Esta versión de Next.js puede diferir de lo que el modelo tenga memorizado (APIs, convenciones, estructura de archivos).

- Antes de implementar rutas, datos, metadata o APIs de Next, revisa la guía instalada en **`node_modules/next/dist/docs/`** (o la documentación oficial de la misma versión que declare `package.json`).
- Respeta avisos de **deprecación** del compilador y del linter.

## Estructura útil

| Ruta | Rol |
|------|-----|
| `app/layout.tsx`, `app/page.tsx`, `app/globals.css` | Shell, fuentes, tema Tailwind/shadcn |
| `components/dashboard/dashboard-app.tsx` | Layout del dashboard, navegación lateral, vistas por sección |
| `components/dashboard/bonos-view.tsx` | Vista Bonos / Freespins |
| `components/ui/chart.tsx`, `components/ui/button.tsx` | Primitivas UI compartidas |
| `lib/dashboard-mock.ts`, `lib/bonos-mock.ts` | Datos de demostración |
| `public/logo-*.svg` | Logos de marca |

Añade nuevas vistas o bloques en `components/dashboard/` y datos simulados en `lib/` con nombres claros (`*-mock.ts`).

## Comandos (npm)

Desde la raíz del repo:

| Acción | Comando |
|--------|---------|
| Instalar dependencias | `npm install` |
| Servidor de desarrollo | `npm run dev` |
| Build de producción (incluye TypeScript) | `npm run build` |
| Linter | `npm run lint` |
| Servir build local | `npm run start` (tras `npm run build`) |

No hay suite de tests automatizada aún. **Antes de dar por cerrado un cambio**, ejecuta al menos `npm run build` y, si tocaste estilo o convenciones, `npm run lint`.

## Flujo de trabajo recomendado

1. Lee el código existente en la zona que vas a cambiar (`dashboard-app.tsx`, vistas, mocks).
2. Mantén la **coherencia visual** (sidebar oscuro, fondo `#f4f7fa`, tarjetas blancas, acentos azules) salvo que el usuario pida lo contrario.
3. Gráficas con Recharts: prefiero `ChartContainer` y helpers de `components/ui/chart.tsx` cuando aplique.
4. Componentes que usan hooks del cliente o Recharts deben llevar **`"use client"`** en la primera línea del archivo.
5. Textos de producto en **español**; comentarios de código en inglés o español según el archivo vecino.

## Estilo de código

- **TypeScript estricto**; evita `any` salvo justificación breve.
- Imports con alias **`@/`** (raíz del proyecto).
- **Tailwind** para layout y estilo; evita CSS suelto salvo `globals.css` o casos puntuales.
- No expandas el alcance del pedido (sin refactors masivos no solicitados).
- No añadas documentación markdown extra (README, etc.) salvo que el usuario lo pida.

## Seguridad y secretos

- No commitees API keys ni `.env` con secretos. Si se añaden variables de entorno, documenta solo los **nombres** de las variables en código o en issues, no valores.

## Pull requests / commits

- Mensajes claros en una línea o párrafo corto (qué cambió y por qué).
- Asegura `npm run build` (y `npm run lint` si aplica) antes de proponer merge.

## Referencias cruzadas

- `CLAUDE.md` en la raíz apunta a este archivo; mantenlos alineados si cambias reglas globales para agentes.
