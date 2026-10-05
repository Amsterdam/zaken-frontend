# AGENTS.md

Instructies voor AI-codeerassistenten die in deze repo werken.

Zaken is de applicatie van de gemeente Amsterdam (Wonen) voor het behandelen van handhavingszaken: zaken aanmaken, taken uit de Camunda-workflow afhandelen, bezoeken, besluiten en adresinformatie.

## Stack

Dezelfde stack als `top-frontend-v2`: Vite, TypeScript, React 19, Amsterdam Design System (`@amsterdam/design-system-*`), CSS Modules, TanStack Query, react-hook-form + `@amsterdam/ee-ads-rhf` en React Router (`createBrowserRouter`). De migratie daarnaartoe staat beschreven in [`MIGRATION.md`](./MIGRATION.md).

- **Eerst een voorbeeld, dan uitrollen.** Elke nieuwe soort wijziging begint met één pilot (één hook, component of pagina) die getest en goedgekeurd wordt. Voer een patroon nooit in één keer door de hele codebase door.
- Kijk voor een nieuw onderdeel eerst of het Amsterdam Design System het al heeft, en daarna of `top-frontend-v2` er een voorbeeld van heeft.
- Imports gebruiken de `@/`-alias voor `src/` (`@/components/...`, `@/api/hooks`).

## Structuur

- `src/api`: de hooks voor de API (TanStack Query), de query keys en `useApiFetch`.
- `src/components`: gedeelde componenten (mappen met een hoofdletter, zoals `Table`, `FormPage`, `FormDialog`, `DefaultLayout`) en de componenten van één onderdeel van de app (mappen met een kleine letter, zoals `case`, `cases`, `addresses`, `tasks`).
- `src/pages`: de pagina's, per onderdeel van de app.
- `src/router`: de routes (`routes.tsx`), de rechten per route (`RequirePermissions`) en de titel van het tabblad. Een paginatest begint met `import "@/router/routes"`, omdat pagina's, layout en routes elkaar importeren.
- `src/config`, `src/hooks`, `src/shared`, `src/styles`, `src/types`: instellingen, gedeelde hooks, functies en constanten zonder React, globale stijlen en eigen types.

## Regels

### Dependencies

- Voeg geen nieuwe dependencies toe zonder expliciete toestemming. Los het eerst op met wat er al is.
- Is een nieuwe dependency echt nodig, leg dan uit waarom en welke alternatieven je hebt overwogen.

### Controleren

Voor elke wijziging: `npm run typecheck`, `npm run lint` en `npm test` moeten slagen.
