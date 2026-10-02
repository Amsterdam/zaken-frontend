# Migratieplan zaken-frontend

Doel: zaken-frontend omzetten naar dezelfde toekomstbestendige stack als [`top-frontend-v2`](../top-frontend-v2):

| Onderdeel        | Nu                                                                 | Straks                                                                                  |
| ---------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| React            | 18.3                                                               | 19.x                                                                                    |
| Styling          | `styled-components` 5 + `asc-ui` theme helpers                     | CSS Modules (`*.module.css`) + ADS design tokens (`--ams-*`)                           |
| UI-componenten   | `@amsterdam/asc-ui`, `@amsterdam/asc-assets`, `@amsterdam/wonen-ui` | `@amsterdam/design-system-react`, `-css`, `-tokens`, `-assets`, `-react-icons`         |
| Formulieren      | `@amsterdam/amsterdam-react-final-form` (scaffold) + `react-final-form` | `react-hook-form` + `@amsterdam/ee-ads-rhf`                                        |
| Data / caching   | Eigen `ApiProvider` + `useApiRequest` + `axios` + `immer`          | `@tanstack/react-query` v5 + `fetch` (`useApiFetch`)                                    |
| Routing          | `react-router-dom` 7, eigen route-object + `<Routes>`              | `react-router` (data router, `createBrowserRouter`)                                     |
| Tooling          | `eslint-config-react-app` (legacy)                                 | ESLint flat config + `typescript-eslint` + Prettier                                     |

---

## 1. Uitgangssituatie (gemeten op `main`, okt 2026)

| Wat                                             | Omvang                                      |
| ----------------------------------------------- | ------------------------------------------- |
| `.tsx`-bestanden                                | 241 (421 bestanden in `src` totaal)         |
| Bestanden met `@amsterdam/asc-ui`               | 92                                          |
| Bestanden met `@amsterdam/wonen-ui`             | 33                                          |
| Bestanden met `amsterdam-react-final-form`      | 37 (waarvan 25× `FormPositioner`, 8× `ScaffoldForm`) |
| Bestanden met `styled-components`               | 25                                          |
| Data-hooks in `src/app/state/rest/*.ts`         | 63 hooks, gebruikt in 69 bestanden          |
| Aanroepen `execGet/Post/Patch/Put/Delete`       | 46 / 28 / 16 / 2 / 2                        |
| Eigen rest-infrastructuur (`hooks/`, `provider/`) | ~950 regels                               |
| Testbestanden                                   | 19                                          |

### Peer dependencies: dit bepaalt de volgorde

| Package                                | React peer-range        |
| -------------------------------------- | ----------------------- |
| `@amsterdam/asc-ui` 0.38               | `^17.0.2 \|\| ^18.1.0` ❌ geen React 19 |
| `@amsterdam/design-system-react` 4.4   | `16 - 19` ✅            |
| `@amsterdam/ee-ads-rhf` 0.0.8          | `18 - 19` ✅ (vereist `react-hook-form ^7.62`) |
| `@tanstack/react-query` 5              | `^18 \|\| ^19` ✅       |

**Gevolg:** de nieuwe libraries (ADS, ee-ads-rhf, TanStack Query) werken al op React 18 en kunnen **naast** de oude libraries draaien. `asc-ui` (en daarmee `amsterdam-react-final-form` en `wonen-ui`) blokkeert React 19. **React 19 komt dus als laatste**, nadat `asc-ui` volledig weg is.

---

## 2. Strategie

**Incrementeel in deze repo, geen big-bang rewrite.** De app draait in productie; elke stap moet afzonderlijk mergebaar en deploybaar zijn.

1. **Eerst horizontale fundamenten** die onzichtbaar zijn voor gebruikers (tooling, datalaag).
2. **Dan ADS ernaast installeren** en de gedeelde bouwstenen (layout, Table, toasts, Card) neerzetten, waar mogelijk overgenomen uit `top-frontend-v2`.
3. **Dan verticaal per domein/pagina** migreren: per pagina in één keer styled-components, asc-ui, wonen-ui en final-form eruit. Zo heb je per PR een pagina die volledig "nieuw" is en end-to-end te testen valt, in plaats van vier halve migraties over de hele app.
4. **Als laatste opruimen + React 19.**

Vuistregel per PR: één domein, groen op `typecheck`, `lint`, `test` en handmatige check op acceptatie.

### Eerst een voorbeeld, dan uitrollen

**Geen enkele wijziging wordt overal tegelijk doorgevoerd.** Elke fase begint met één klein, representatief voorbeeld (een *pilot*) dat eerst getest en goedgekeurd wordt. Pas daarna wordt hetzelfde patroon op de rest van de codebase toegepast.

Werkwijze per pilot:

1. **Bouw het voorbeeld** in een eigen branch/PR, beperkt tot één hook, één component of één pagina.
2. **Test het**: lokaal, daarna op acceptatie. Check functioneel gedrag, foutafhandeling, laadstatussen en (bij UI) het uiterlijk ten opzichte van de huidige versie.
3. **Review & akkoord**: het patroon wordt besproken en expliciet goedgekeurd. Bevindingen worden eerst in het voorbeeld verwerkt.
4. **Leg het patroon vast**: bij akkoord wordt de pilot de referentie-implementatie waar volgende PR's naar verwijzen.
5. **Pas dan uitrollen**, in kleine PR's per domein, niet in één grote PR.

Elke fase hieronder heeft een **🧪 Pilot**-blok met het voorbeeld dat eerst gemaakt en goedgekeurd moet worden, en een **✅ Akkoord**-checkpoint voordat de rest volgt.

---

## 3. Waar te beginnen (aanbevolen volgorde)

> **Begin met Fase 0 (tooling) en direct daarna Fase 1 (TanStack Query).**

Waarom TanStack Query eerst:

- **Geen visuele impact**: het raakt geen styling en werkt op React 18, dus het kan los van alles getest en uitgerold worden.
- **Alles daarna bouwt erop**: elke pagina die je in Fase 3 migreert gebruikt de nieuwe hooks. Doe je het andersom, dan schrijf je componenten twee keer.
- **Grootste reductie in eigen code**: `ApiProvider`, `useApiCache`, `useRequestQueue`, `usePollingRefetch`, `useRequestWrapper`, `useRequest` (~950 regels + tests) en de dependencies `axios`, `immer`, `lodash.merge` kunnen weg.
- **Bewezen patroon**: `top-frontend-v2/src/api/` is direct over te nemen.

Ook binnen Fase 1 wordt eerst **één datagroep als voorbeeld** omgezet en getest, voordat de overige hooks volgen (zie de pilot in Fase 1).

Daarna Fase 2 (ADS-fundament), dan Fase 3 (eerste kleine pagina als voorbeeld, testen, akkoord, en pas dan de rest).

---

## Fase 0 — Voorbereiding & tooling (± 1–2 dagen)

Doel: een stabiele basis waarop elke volgende PR veilig kan landen.

- [x] **Path alias `@/`** toegevoegd naast de bestaande `app/` en `__mocked__` aliases (`tsconfig.json` → `"@/*": ["./src/*"]`; Vite had de alias al). Nieuwe code gebruikt `@/`, oude imports mogen blijven tot ze aangeraakt worden. Verwijder de `"*": ["./src/*"]` wildcard pas aan het einde. De dode `vite-plugin-eslint`-mapping is weg.
- [x] **ESLint flat config** (`eslint.config.js`) overgenomen van top-frontend-v2. `eslint-config-react-app`, `.eslintrc.cjs` en `.eslintignore` zijn weg. Twee niet-stilistische regels uit de oude config zijn behouden (`arrow-body-style`, `consistent-type-definitions: type`).
  - Kleine fouten die de nieuwe regels vonden zijn opgelost (o.a. een onveilige optional chain in `ChangeHousingCorporation`, ongebruikte variabelen en overbodige `eslint-disable`-regels).
  - Bestaande overtredingen in oude code zijn vastgelegd met [ESLint bulk suppressions](https://eslint.org/docs/latest/use/suppressions) in `eslint-suppressions.json` (78 bestanden): `no-explicit-any` (180×), `react-refresh/only-export-components` (18×) en de React Compiler-regels uit `react-hooks` v7 (13×). Nieuwe code krijgt de regels wel als error. Na het oplossen: `npx eslint . --prune-suppressions`. Het doel is dat dit bestand aan het eind van Fase 3 leeg is.
- [ ] **Prettier**: config staat er (`.prettierrc` gelijk aan top-frontend-v2, `.prettierignore`, `.editorconfig`, scripts `format` en `format:check`). **Nog te doen:** in één aparte PR `npm run format` draaien. Dat raakt vrijwel elk bestand (onder andere puntkomma's eruit), dus doe het los van inhoudelijke wijzigingen. Daarna eventueel `format:check` in CI.
- [x] **Testinfrastructuur**: `@testing-library/react` 13 → 16 + `@testing-library/dom`. Alle 77 tests slagen. `renderWithProviders` volgt in de pilot van Fase 1, zodra er een `QueryClient` is.
- [x] **React 18.3 deprecations**: onze eigen code bevat geen `defaultProps`, string refs, legacy context, `findDOMNode`, `ReactDOM.render` of `useRef()` zonder argument, en de tests geven geen React-waarschuwingen. Wat nog in de browserconsole verschijnt komt uit `asc-ui`/`wonen-ui` en verdwijnt met die libraries. Handmatig te controleren: de dev-console na inloggen.
- [x] `AGENTS.md` toegevoegd met de stack-, migratie-, dependency- en lintregels.

> **Gevonden tijdens Fase 0:** `@amsterdam/amsterdam-react-final-form` importeert `lodash/isEqual` zonder `lodash` als dependency te declareren. Dat werkte alleen omdat `eslint-config-react-app` toevallig `lodash` meeinstalleerde; zonder die package faalde de productie-build. `lodash` staat daarom nu expliciet in `dependencies` (zelfde versie als voorheen) en gaat in Fase 5 samen met `amsterdam-react-final-form` weer weg.

## Fase 1 — Datalaag naar TanStack Query (± 1–2 weken)

Doel: `useApiRequest` en de `ApiProvider` vervangen door TanStack Query, zonder UI-wijzigingen.

### 1a. Infrastructuur
- [ ] Installeren: `@tanstack/react-query`, `@tanstack/react-query-devtools` (dev).
- [ ] Overnemen uit top-frontend-v2:
  - `src/api/queryClient.ts`: globale defaults (`retry: false`, `refetchOnWindowFocus: false`, `staleTime`) + globale error-toast via `QueryCache`/`MutationCache` met `meta.globalErrorToast` opt-out.
  - `src/api/useApiFetch.ts`: token-gebonden `fetch` wrapper (vervangt `axios` + `useRequestWrapper` + `useProtectedRequest`).
  - `src/api/queryKeys.ts`: hiërarchische key-factory. Maak één entry per huidige `ApiGroup` (`addresses`, `case`, `cases`, `fines`, `permissions`, `roles`, `task`, `themes`, `users`, …).
  - `src/api/utils/` (`makeApiUrl`, `normalizeApiError`, `stringifyQueryParams`).
- [ ] `QueryClientProvider` in `App.tsx` **naast** de bestaande `ApiProvider` hangen (ze kunnen tijdelijk samen bestaan).
- [ ] De huidige `useErrorHandler` / flash-message-afhandeling koppelen aan de `QueryCache.onError`, zodat foutmeldingen hetzelfde blijven.

### 1b. Hooks migreren, per `ApiGroup`
Nieuwe hooks in `src/api/hooks/<domein>.ts`. Mapping:

| Oud                                         | Nieuw                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------- |
| `const [data, { isBusy, execGet }] = useX()` | `const { data, isPending, refetch } = useX()`                         |
| `lazy: true`                                | `enabled: false` (of `enabled: Boolean(param)`)                       |
| `keepUsingInvalidCache`                     | `placeholderData: keepPreviousData`                                   |
| `execPost/Patch/Put/Delete`                 | aparte `useMutation` hook per actie                                   |
| `clearCache()` (hele groep leeg)            | `queryClient.invalidateQueries({ queryKey: queryKeys.<groep>.all })`  |
| `useResponseAsCache`                        | `queryClient.setQueryData(...)` in `onSuccess`                        |
| `updateCache(updater)`                      | `queryClient.setQueryData(key, old => ...)`                           |
| `usePollingRefetch`                         | `refetchInterval`                                                     |
| `useRequestQueue` (dedupe)                  | ingebouwd in TanStack Query                                           |
| `isMocked` / `useMockedRequest`             | MSW of mocks in tests; niet in productiecode                          |

Aanbevolen volgorde (klein → groot, weinig → veel consumenten):
1. `themes`, `roles`, `permissions`, `users`, `help`, `reasons`
2. `addresses`, `bagPdok`, `benkAgg`, `dataPunt`, `residents`, `fines`
3. `listing`, `schedules`, `processes`, `feedback`
4. `cases` (incl. de paginering/sorteerlogica), `case`, `tasks`

Per groep: hook herschrijven → alle consumenten aanpassen → oude hook verwijderen → testen.

> **🧪 Pilot: eerst één voorbeeld**
>
> Vóór de rest van de hooks wordt alleen dit omgezet:
> - **Lezen:** `themes` (`useThemes`). Klein en veel gebruikt, dus het effect is direct zichtbaar.
> - **Schrijven:** één mutatie, bijvoorbeeld `feedback` (POST). Daarmee is ook `useMutation` + invalidatie gedekt.
> - De infrastructuur uit 1a (`queryClient`, `useApiFetch`, `queryKeys`, foutafhandeling).
>
> Testen op acceptatie: data laadt goed, laadstatus klopt, een API-fout geeft dezelfde melding als voorheen, de cache wordt na een mutatie ververst en de React Query Devtools tonen de verwachte keys.
>
> **✅ Akkoord** op dit voorbeeld → pas daarna de overige groepen in de volgorde hierboven.

#### Status pilot: gebouwd, wacht op test en akkoord

Wat er staat:

| Bestand | Wat |
| --- | --- |
| `src/api/useApiFetch.ts` | `fetch` met Bearer-token; gooit een `ApiError` (`status`, `message`, `url`, plus de JSON-body zoals `detail`); bij 403 → `/auth`, net als `useProtectedRequest` |
| `src/api/queryClient.ts` | Defaults (`retry: false`, `refetchOnWindowFocus: false`, `staleTime` 5 min) en een globale foutmelding met precies dezelfde titel en opbouw als de oude `useErrorHandler`; opt-out via `meta: { globalErrorToast: false }` |
| `src/app/state/flashMessages/flashMessageBridge.ts` | Laat de `QueryClient` (buiten React) de bestaande flash messages tonen; `FlashMessageProvider` registreert zich |
| `src/api/queryKeys.ts` | Key-factory, nu alleen `themes` |
| `src/api/hooks/themes.ts` | `useCaseThemes()` → `useQuery` (vervangt de oude in `app/state/rest/themes.ts`) |
| `src/api/hooks/feedback.ts` | `useCreateFeedback()` → `useMutation` (vervangt `app/state/rest/feedback.ts`, verwijderd) |
| `src/test-utils/createQueryWrapper.tsx` | Verse `QueryClient` per test |
| `src/api/**/__tests__` | 11 tests: fetch/headers/body, `ApiError`, 403-redirect, opmaak foutmelding, dedupe van `useCaseThemes`, POST van feedback |

`QueryClientProvider` hangt in `App.tsx` naast de bestaande `ApiProvider`; de React Query Devtools staan alleen aan in development. Aangepaste consumenten: `Cases`, `Tasks`, `CreateForm`, `DebriefForm`, `ChangeSubjectForm` en `Feedback`. Die laatste gebruikt nu `isPending` in plaats van een eigen `loading`-state.

Bewuste verschillen met het oude gedrag:
- **Verversen:** de oude cache werd nooit opnieuw opgehaald tenzij hij ongeldig werd gemaakt. Nu zijn thema's 5 minuten "vers"; daarna worden ze bij het openen van een pagina op de achtergrond opnieuw opgehaald (de oude data blijft zichtbaar).
- **Foutmelding zonder `detail`:** toont nu de HTTP-statustekst (bijv. `Internal Server Error`) in plaats van de axios-tekst `Request failed with status code 500`.
- **Feedback** maakte bij de POST de cachegroep `supportContacts` leeg. Feedback verandert de supportcontacten niet, dus dat is niet overgenomen.

Testchecklist voor acceptatie:
- [ ] Zakenoverzicht en takenoverzicht: het themafilter toont alle thema's en filteren werkt.
- [ ] Zaak aanmaken: themakeuze werkt, ook via de TON-flow (alleen het TON-thema).
- [ ] Debrief-formulier en "Onderwerp wijzigen" op zaakdetail: thema's laden.
- [ ] Devtools (lokaal): één query `["themes","list"]`, ook als je tussen deze pagina's wisselt (geen dubbele requests in het Network-tabblad).
- [ ] Feedback versturen: knop disabled met spinner tijdens versturen, daarna "Bedankt voor je feedback!" en de modal sluit.
- [ ] Fout: zet in de Network-tab request blocking op `/themes/` of `/feedback/` → zelfde rode melding "Oeps er ging iets mis!" als voorheen, met de URL.
- [ ] 403: een gebruiker zonder rechten komt op `/auth`, zoals nu.

### 1c. Opruimen
- [ ] `src/app/state/rest/hooks/*`, `provider/*` en `ApiProvider` verwijderen.
- [ ] Dependencies weg: `axios`, `immer` (ook uit `useFlashMessagesReducer` en `ShowHide`, of die laatste pas in Fase 3), `lodash.merge`, `qs` (vervangen door `URLSearchParams`/`stringifyQueryParams`).
- [ ] `ValueProvider` herzien: de filterstate voor cases/tasks (`results`, `count`) hoort nu in de query-cache; alleen de filterwaarden zelf blijven over. Overweeg die in de URL (search params) te zetten, dan kan de context weg.

## Fase 2 — Amsterdam Design System-fundament (± 1 week)

Doel: ADS geïnstalleerd en gedeelde bouwstenen klaar, terwijl asc-ui nog gewoon werkt.

- [ ] Installeren: `@amsterdam/design-system-assets`, `-css`, `-react`, `-react-icons`, `-tokens`, `@amsterdam/ee-ads-rhf`, `react-hook-form`.
- [ ] Global CSS zoals in `top-frontend-v2/src/index.css`: fonts, `design-system-css`, `design-system-tokens` (+ `compact.css`), eigen `styles/design-system-overrides.css`. ADS gebruikt `ams-`-geprefixte classes, dus het botst niet met de styled-components van asc-ui. Controleer wel `GlobalStyle` van asc-ui op conflicterende resets (body/font).
- [ ] Bestaande `src/app/components/shared/ams-tokens.css` vervangen door de officiële tokens.
- [ ] Gedeelde componenten neerzetten in `src/components/`, waar mogelijk overgenomen uit top-frontend-v2:
  - `DefaultLayout` (ADS `Page`, `PageHeader`, `PageFooter`, navigatie) → vervangt `layouts/DefaultLayout`, `MainWrapper`, asc-ui `Header`/`MenuInline`/`MenuToggle`.
  - `toasts/` (ToastProvider + `toastBridge`) → vervangt `FlashMessageProvider` + `immer` reducer.
  - `Table` → vervangt `wonen-ui` `Table`/`LoadingRows`.
  - `Card`, `spinners/AmsterdamCrossSpinner`, `ErrorState`, `ConfirmDialog` (ADS `Dialog` → vervangt asc-ui `Modal`).
  - `CaseEventTimeline` → vervangt `wonen-ui` `EventsTimeline`.
- [ ] Een gedeelde formulier-basis: `src/forms/` met `mapToOptions` en een `FormActions`/`SubmitButton` patroon.

> **🧪 Pilot: eerst één voorbeeld**
>
> Installeer ADS en de global CSS en zet **één** gedeeld component (bijvoorbeeld `Card` of `Table`) op **één** bestaande pagina. De rest van de app blijft op asc-ui.
>
> Testen: ADS en asc-ui botsen niet (fonts, `GlobalStyle`-resets, spacing), de pagina ziet er goed uit op desktop en mobiel en er zijn geen regressies op de andere pagina's.
>
> **✅ Akkoord** → daarna de overige gedeelde componenten bouwen.

## Fase 3 — Verticale migratie per domein (± 4–8 weken)

Per pagina/feature in één PR: styled-components → CSS Modules, asc-ui → ADS, wonen-ui → eigen/ADS-componenten, final-form → react-hook-form.

> **🧪 Pilots: eerst één voorbeeld per soort wijziging**
>
> Deze fase raakt de hele UI. Daarom komt er eerst een apart voorbeeld per soort wijziging, dat getest en goedgekeurd wordt voordat dat soort wijziging verder wordt uitgerold:
>
> | Soort wijziging                     | Voorbeeld (pilot)                                        | Wat testen                                                    |
> | ----------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
> | Volledige pagina naar ADS + CSS Modules | `help/HelpPage` of `errors/NotFoundPage`             | Uiterlijk vs. huidige versie, responsive, toegankelijkheid    |
> | Layout (header/navigatie/footer)    | `DefaultLayout` op de gemigreerde pilotpagina            | Navigatie, gebruikersmenu, mobiel menu, skip-links            |
> | Formulier naar react-hook-form      | één eenvoudig formulier, bijv. `ChangeDueDateForm`       | Validatie, foutmeldingen, submit-payload identiek aan nu      |
> | Filters                             | `CasesFilter` (alleen cases-overzicht)                   | Filteren, paginering, sortering, bewaren van filterwaarden    |
> | wonen-ui vervanging                 | `DefinitionList` → `DescriptionList` op één detailpagina | Weergave van lege/ontbrekende waarden, datums                 |
> | Dynamisch workflowformulier         | één workflow-taaktype via `DynamicField`                 | Alle veldtypes, payload naar Camunda identiek aan nu          |
>
> **✅ Akkoord per pilot** → pas daarna de overige pagina's/formulieren van dat type.

### Volgorde
1. **Proefmigratie** (kleine, losse pagina's om patronen vast te leggen): `errors/NotFoundPage`, `auth/*`, `help`, `ton`, `fines`.
2. **Layout-switch**: `App.tsx` → `DefaultLayout` van ADS; `ThemeProvider`/`GlobalStyle` van asc-ui blijven nog staan voor niet-gemigreerde pagina's.
3. **Adressen**: `addresses/details`, `people`, `permits` (bevat `wonen-ui` `Residents`, `Person*Display`, `PermitsOverview`, `PermitsSynopsis`, `HolidayRentalRegistration(s)`).
4. **Overzichten**: `tasks/IndexPage` (`TasksFilter`, `TableTasks`) en `cases/index` (`CasesFilter`). Filters zijn final-form scaffolds → react-hook-form met `useWatch` om live te filteren.
5. **Zaak aanmaken**: `cases/create` (`CreateForm`).
6. **Zaakdetail**: `cases/details`, `CaseDetails`, `CaseTimeline`, alerts.
7. **Zaakformulieren** (`src/app/pages/case/*` + `components/case/forms/*`): visits, debriefings, decisions, quick-decisions, summons, schedules, citizenreports, complete, task.
8. **Workflow (hoogste risico, als laatste)**: `case/tasks/WorkflowTask`, `WorkflowForm`, `UpdateSchedule`. Deze formulieren worden dynamisch opgebouwd uit Camunda-data (`mapWorkflowDataToScaffold`). Bouw een generieke `DynamicField`-renderer die `is_date` / `checkbox` / `multiselect` / `select` / `number` / `text` mapt op `DateControl`, `CheckboxControl`, `CheckboxControlGroup`, `SelectControl`, `TextInputControl type="number"`, `TextAreaControl`. Schrijf hier eerst tests voor (input: workflow-JSON, verwacht: velden + payload).

### Componentmapping: asc-ui → ADS

| asc-ui                                  | ADS (`@amsterdam/design-system-react`)                         |
| --------------------------------------- | -------------------------------------------------------------- |
| `Heading`, `Paragraph`, `Typography`    | `Heading`, `Paragraph`                                         |
| `Button`, `MenuButton`                  | `Button` (`variant="primary\|secondary\|tertiary"`)            |
| `Link`                                  | `Link` (+ `react-router` `Link` via `as`/wrapper)              |
| `Alert`                                 | `Alert`                                                        |
| `Spinner`                               | eigen `AmsterdamCrossSpinner` (uit top-frontend-v2)            |
| `Label`, `ErrorMessage`                 | `Label`, `ErrorMessage` (via ee-ads-rhf automatisch)           |
| `Checkbox`, `Radio`, `RadioGroup`, `Select`, `TextArea`, `Switch` | ee-ads-rhf `*Control` componenten     |
| `SearchBar`                             | `SearchField`                                                  |
| `Modal`, `AscModal`                     | `Dialog`                                                       |
| `Accordion`                             | `Accordion`                                                    |
| `Breadcrumbs`                           | `Breadcrumb`                                                   |
| `Card`, `CardContent`                   | `Card` of eigen `Card` (top-frontend-v2)                       |
| `List`, `ListItem`                      | `UnorderedList`, `OrderedList`                                 |
| `Divider`                               | eigen `Divider` (top-frontend-v2) of CSS border                |
| `Header`, `TopBar`, `MenuInline`, `MenuToggle`, `MenuItem` | `PageHeader` + `Menu`                        |
| `Icon` + `@amsterdam/asc-assets`        | `Icon` + `@amsterdam/design-system-react-icons`                |
| `FormTitle`                             | `Heading level={…}`                                            |
| `themeSpacing(n)`, `themeColor(…)`, `breakpoint(…)` | CSS vars `--ams-space-*`, `--ams-color-*`; media queries in CSS Module |
| `useFocusWithArrows`                    | eigen kleine hook of ADS-gedrag                                |

### Componentmapping: wonen-ui → nieuw

| wonen-ui                                | Vervanging                                                    |
| --------------------------------------- | ------------------------------------------------------------- |
| `DefinitionList`                        | ADS `DescriptionList`                                         |
| `Table`, `LoadingRows`, `SmallSkeleton` | eigen `Table` (top-frontend-v2) + `CardSkeletons`              |
| `DateDisplay`, `Date`                   | `shared/dateFormatters.ts` (dayjs)                            |
| `CaseIdDisplay`                         | kleine eigen component/formatter                              |
| `PersonNameDisplay`, `PersonRoleDisplay`, `PersonEntityDisplay`, `Residents` | eigen componenten in `src/components/persons/` (top-frontend-v2 heeft `residents`-hooks) |
| `PermitsOverview`, `PermitsSynopsis`, `HolidayRentalRegistration(s)` | eigen componenten in `src/components/permits/` |
| `EventsTimeline`                        | `CaseEventTimeline` (top-frontend-v2)                         |
| `List`                                  | ADS `UnorderedList`                                           |

### Formulieren: final-form → react-hook-form + ee-ads-rhf

| amsterdam-react-final-form              | Nieuw                                                          |
| --------------------------------------- | -------------------------------------------------------------- |
| `ScaffoldForm` + `scaffold.ts`          | `useForm()` + `<FormProvider form={form}>` + expliciete JSX-velden |
| `FormPositioner` (25×)                  | ADS `Grid` / `Column` / `Row`                                  |
| `ScaffoldField` type `TextField`        | `TextInputControl`                                             |
| `TextAreaField`                         | `TextAreaControl`                                              |
| `DateField`                             | `DateControl`                                                  |
| `ComplexSelectField`, `SelectField`     | `SelectControl` / `ReactSelectControl`                         |
| `CheckboxFields`, `Boolean`             | `CheckboxControlGroup`, `CheckboxControl`                      |
| `RadioFields`                           | `RadioControl`                                                 |
| `ShowHide` (+ immer)                    | `useWatch` + conditionele render                               |
| `AutoFillButton`                        | `form.setValue(...)`                                           |
| `ConfirmScaffoldForm`                   | `ConfirmDialog` + `handleSubmit`                               |
| final-form validators                   | `rules` per control (of zod-schema, alleen na akkoord over extra dependency) |
| foutoverzicht                           | `InvalidFormAlert` + `mapErrorsToAlert`                        |

### Styling: styled-components → CSS Modules

```tsx
// Oud
const Wrap = styled.div`
  margin-bottom: ${ themeSpacing(4) };
  color: ${ themeColor("tint", "level5") };
`

// Nieuw: Component.module.css
.wrap {
  margin-block-end: var(--ams-space-l);
  color: var(--ams-color-text-secondary);
}
// Component.tsx
import styles from "./Component.module.css"
<div className={styles.wrap}>
```

- Gebruik eerst ADS layout-componenten (`Grid`, `Column`, `Row`, `Page`) en hun `gap`-props; schrijf pas CSS als dat niet volstaat.
- Alleen ADS tokens, geen hardcoded kleuren/spacing.
- Eén `.module.css` naast elk component dat eigen styling heeft.

## Fase 4 — Routing modernisering (± 2–3 dagen, kan parallel aan Fase 3)

- [ ] `react-router-dom` → `react-router` (v7 heeft alles in `react-router`; top-frontend-v2 draait al op v8).
- [ ] `src/router/routes.tsx` + `createBrowserRouter` + `<RouterProvider>` in plaats van `<BrowserRouter>` + eigen `routesToRouteConfig`.
- [ ] `ProtectedPage`/`AuthorizedPage` → `RequirePermissions` layout-route (zie top-frontend-v2).
- [ ] `PageTitle` → per route `handle` of `<title>` (React 19 ondersteunt `<title>` in componenten).
- [ ] `useNavigateWithFlashMessage` → navigeren + toast.

> **🧪 Pilot: eerst één voorbeeld**
>
> Zet `createBrowserRouter` op met **één** routegroep (bijvoorbeeld `help` of `fines`) via de nieuwe `routes.tsx`, terwijl de overige routes nog via de huidige config lopen.
>
> Testen: deep links, terugknop, redirect na inloggen (`url_state`), permissiecheck en 404-pagina.
>
> **✅ Akkoord** → daarna de overige routegroepen overzetten.

## Fase 5 — React 19 + opruimen (± 2–3 dagen)

Voorwaarde: `grep -r "@amsterdam/asc-ui\|wonen-ui\|amsterdam-react-final-form\|styled-components" src` geeft niets terug.

> **🧪 Pilot: eerst één voorbeeld**
>
> Doe de React 19-upgrade eerst op een aparte branch en zet die alleen op **acceptatie**, niet direct op productie. Loop daar de belangrijkste flows door: inloggen, zoeken, zaak aanmaken, zaakdetail, een workflowtaak afronden, takenoverzicht. Controleer ook de browserconsole op warnings.
>
> **✅ Akkoord** na de test op acceptatie → pas dan mergen en naar productie.

- [ ] Dependencies verwijderen: `@amsterdam/asc-ui`, `@amsterdam/asc-assets`, `@amsterdam/wonen-ui`, `@amsterdam/amsterdam-react-final-form`, `final-form`, `final-form-arrays`, `react-final-form`, `react-final-form-arrays`, `styled-components`, `@types/styled-components`, `lodash` (tijdelijk toegevoegd in Fase 0), `lodash.isempty`, `lodash.merge`, `immer`, `axios`, `qs`, `react-router-dom`. Controleer `react-tooltip` (alleen in `CustomTooltip`; ADS-alternatief of native `title`/popover).
- [ ] `ThemeProvider`/`GlobalStyle` uit `App.tsx`.
- [ ] Upgrade: `react@^19`, `react-dom@^19`, `@types/react@^19`, `@types/react-dom@^19`.
- [ ] Codemods draaien: `npx codemod@latest react/19/migration-recipe` en `npx types-react-codemod@latest preset-19 ./src`.
- [ ] Aandachtspunten React 19:
  - `ref` is een gewone prop → `forwardRef` (1 bestand) kan weg.
  - `React.FC` (191 bestanden) werkt nog. Bij voorkeur geleidelijk omzetten naar `function Component(props: Props)`, zoals in top-frontend-v2.
  - `useRef()` zonder argument is niet meer toegestaan → `useRef<T>(null)`.
  - `JSX` namespace: `React.JSX` gebruiken.
- [ ] `tsconfig` gelijktrekken met top-frontend-v2 (`tsconfig.app.json` / `tsconfig.node.json`, `verbatimModuleSyntax`, `noUnusedLocals`), `app/` en `*` aliases verwijderen.
- [ ] Mapstructuur gelijktrekken: `src/app/*` → `src/{api,components,pages,router,hooks,shared,forms,styles}`.
- [ ] README en `AGENTS.md` bijwerken.

---

## 4. Samenvatting planning

| #  | Fase                              | Afhankelijk van | Pilot (eerst testen + akkoord)                  | Indicatie   | Zichtbaar voor gebruiker? |
| -- | --------------------------------- | --------------- | ----------------------------------------------- | ----------- | ------------------------- |
| 0  | Tooling & voorbereiding           | –               | –                                               | 1–2 dagen   | Nee                       |
| 1  | TanStack Query                    | 0               | `themes` + één mutatie (`feedback`)             | 1–2 weken   | Nee (alleen sneller)      |
| 2  | ADS-fundament                     | 0               | één gedeeld component op één pagina             | 1 week      | Beperkt (layout)          |
| 3  | Verticale migratie per domein     | 1, 2            | één voorbeeld per soort wijziging (zie Fase 3)  | 4–8 weken   | Ja                        |
| 4  | Routing                           | 0               | één routegroep                                  | 2–3 dagen   | Nee                       |
| 5  | React 19 + opruimen               | 3 (volledig)    | upgrade-branch eerst alleen op acceptatie       | 2–3 dagen   | Nee                       |

De indicaties gaan over bouwtijd. Reken per pilot op extra doorlooptijd voor test en akkoord.

Fase 1 en 2 kunnen parallel lopen als er twee mensen aan werken.

## 5. Risico's en aandachtspunten

- **Dynamische workflowformulieren** (Camunda) zijn het meest complexe stuk. Eerst tests op de huidige mapping schrijven, dan migreren.
- **Twee designsystemen tegelijk** geeft tijdelijk visuele inconsistentie. Minimaliseer dit door per volledige pagina te migreren en de layout vroeg om te zetten.
- **Cache-invalidatie**: de huidige `clearCache()` leegt een hele `ApiGroup` na elke mutatie. Neem dat gedrag in eerste instantie 1-op-1 over (`invalidateQueries` op de groep-key) en optimaliseer pas later, om regressies te voorkomen.
- **Bundle-grootte** groeit tijdelijk (beide libraries geladen). Dat is acceptabel zolang de migratie loopt.
- **`ee-ads-rhf` is v0.0.x**: API kan nog wijzigen. Pin de versie en kijk hoe top-frontend-v2 ermee omgaat.
- **Geen nieuwe dependencies** zonder overleg (zelfde regel als top-frontend-v2). `react-hook-form` is een verplichte peer van `ee-ads-rhf` en hoort er dus bij.
