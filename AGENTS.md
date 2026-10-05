# AGENTS.md

Instructies voor AI-codeerassistenten die in deze repo werken.

Zaken is de applicatie van de gemeente Amsterdam (Wonen) voor het behandelen van handhavingszaken: zaken aanmaken, taken uit de Camunda-workflow afhandelen, bezoeken, besluiten en adresinformatie. Stack: Vite, TypeScript, React 18, React Router.

## Migratie

De app wordt gemigreerd naar de stack van `top-frontend-v2` (React 19, Amsterdam Design System, CSS Modules, TanStack Query, react-hook-form + `@amsterdam/ee-ads-rhf`). Volg [`MIGRATION.md`](./MIGRATION.md).

- **Eerst een voorbeeld, dan uitrollen.** Elke nieuwe soort wijziging begint met één pilot (één hook, component of pagina) die getest en goedgekeurd wordt. Voer een patroon nooit in één keer door de hele codebase door.
- Nieuwe code gebruikt de nieuwe stack zodra die voor dat onderdeel beschikbaar is. Voeg geen nieuwe code toe met `styled-components`, `@amsterdam/asc-ui`, `@amsterdam/wonen-ui` of `@amsterdam/amsterdam-react-final-form`, tenzij je een bestaand, nog niet gemigreerd bestand klein aanpast.
- Imports gebruiken de `@/`-alias (`@/app/...`, `@/components/...`). De oude alias `app/...` bestaat niet meer.

## Regels

### Dependencies

- Voeg geen nieuwe dependencies toe zonder expliciete toestemming. Los het eerst op met wat er al is.
- Is een nieuwe dependency echt nodig, leg dan uit waarom en welke alternatieven je hebt overwogen.

### Lint

- `eslint-suppressions.json` legt bestaande overtredingen vast (vooral `any`, React Compiler-regels en fast refresh in oude code). Voeg daar geen nieuwe overtredingen aan toe; los ze op in de code.
- Heb je een vastgelegde overtreding opgelost, draai dan `npx eslint . --prune-suppressions` zodat het bestand krimpt.

### Controleren

Voor elke wijziging: `npm run typecheck`, `npm run lint` en `npm test` moeten slagen.
