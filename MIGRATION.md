# Migratieplan zaken-frontend

Doel: zaken-frontend omzetten naar dezelfde toekomstbestendige stack als [`top-frontend-v2`](../top-frontend-v2):

| Onderdeel      | Nu                                                                      | Straks                                                                         |
| -------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| React          | 18.3                                                                    | 19.x                                                                           |
| Styling        | `styled-components` 5 + `asc-ui` theme helpers                          | CSS Modules (`*.module.css`) + ADS design tokens (`--ams-*`)                   |
| UI-componenten | `@amsterdam/asc-ui`, `@amsterdam/asc-assets`, `@amsterdam/wonen-ui`     | `@amsterdam/design-system-react`, `-css`, `-tokens`, `-assets`, `-react-icons` |
| Formulieren    | `@amsterdam/amsterdam-react-final-form` (scaffold) + `react-final-form` | `react-hook-form` + `@amsterdam/ee-ads-rhf`                                    |
| Data / caching | Eigen `ApiProvider` + `useApiRequest` + `axios` + `immer`               | `@tanstack/react-query` v5 + `fetch` (`useApiFetch`)                           |
| Routing        | `react-router-dom` 7, eigen route-object + `<Routes>`                   | `react-router` (data router, `createBrowserRouter`)                            |
| Tooling        | `eslint-config-react-app` (legacy)                                      | ESLint flat config + `typescript-eslint` + Prettier                            |

---

## Stand van zaken (okt 2026)

- **Fase 0 ✅** Tooling: ESLint flat config (met bulk suppressions), Prettier (hele codebase geformatteerd), Testing Library 16, `@/`-alias, `AGENTS.md`.
- **Fase 1 ✅** Alle data via TanStack Query (`src/api/`); de oude laag `src/app/state/rest/` en `axios`, `qs`, `lodash.merge`, `lodash.isempty` zijn weg. Mutaties werken alleen bij wat de gewijzigde data toont, vaak zonder refetch.
- **Fase 2 (bezig):** ADS staat naast `asc-ui`; de pilot (nieuwe layout `src/components/DefaultLayout/` op de 404-pagina) is ✅ akkoord. Nu pagina voor pagina, met een controle na elke pagina: 404, Hulp, 403 en `/auth` (pilot voor `Description`, de vervanger van `DefinitionList` van `wonen-ui`) de invorderingscheck en de startpagina (adres zoeken) zijn ✅ akkoord. Bezig: het zakenoverzicht, in drie stappen: (1) layout + `Table` — ✅ akkoord; (2) filters naar ADS, boven de tabel — ✅ akkoord; (3) filters naar de URL — omgezet, wacht op test.
- **Restpunten:** filters van de overzichten naar de URL (eigen pilot, past bij Fase 3); `immer` (weg met flash messages → toasts en `ShowHide`); `lodash` (weg met `amsterdam-react-final-form`); 155 vastgelegde lint-overtredingen in `eslint-suppressions.json` (lossen grotendeels op in Fase 3).

## 1. Uitgangssituatie (gemeten op `main`, okt 2026)

| Wat                                               | Omvang                                               |
| ------------------------------------------------- | ---------------------------------------------------- |
| `.tsx`-bestanden                                  | 241 (421 bestanden in `src` totaal)                  |
| Bestanden met `@amsterdam/asc-ui`                 | 92                                                   |
| Bestanden met `@amsterdam/wonen-ui`               | 33                                                   |
| Bestanden met `amsterdam-react-final-form`        | 37 (waarvan 25× `FormPositioner`, 8× `ScaffoldForm`) |
| Bestanden met `styled-components`                 | 25                                                   |
| Data-hooks in `src/app/state/rest/*.ts`           | 63 hooks, gebruikt in 69 bestanden                   |
| Aanroepen `execGet/Post/Patch/Put/Delete`         | 46 / 28 / 16 / 2 / 2                                 |
| Eigen rest-infrastructuur (`hooks/`, `provider/`) | ~950 regels                                          |
| Testbestanden                                     | 19                                                   |

### Peer dependencies: dit bepaalt de volgorde

| Package                              | React peer-range                               |
| ------------------------------------ | ---------------------------------------------- |
| `@amsterdam/asc-ui` 0.38             | `^17.0.2 \|\| ^18.1.0` ❌ geen React 19        |
| `@amsterdam/design-system-react` 4.4 | `16 - 19` ✅                                   |
| `@amsterdam/ee-ads-rhf` 0.0.8        | `18 - 19` ✅ (vereist `react-hook-form ^7.62`) |
| `@tanstack/react-query` 5            | `^18 \|\| ^19` ✅                              |

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

**Geen enkele wijziging wordt overal tegelijk doorgevoerd.** Elke fase begint met één klein, representatief voorbeeld (een _pilot_) dat eerst getest en goedgekeurd wordt. Pas daarna wordt hetzelfde patroon op de rest van de codebase toegepast.

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
- [x] **Prettier**: config gelijk aan top-frontend-v2 (`.prettierrc`, `.prettierignore`, `.editorconfig`, scripts `format` en `format:check`). De hele codebase is in een aparte commit geformatteerd (na Fase 1).
  - Les: Prettier kan een regel met een `// @ts-expect-error` erboven over meerdere regels verdelen, waarna de directive niet meer op de regel met de fout staat (gebeurd in `ScaffoldFields.tsx`). Na `npm run format` dus altijd `npm run typecheck`.
  - Tip: zet de hash van de formatting-commit in `.git-blame-ignore-revs` (en lokaal `git config blame.ignoreRevsFile .git-blame-ignore-revs`), zodat `git blame` en GitHub die commit overslaan. Overweeg `npm run format:check` in CI.
- [x] **Testinfrastructuur**: `@testing-library/react` 13 → 16 + `@testing-library/dom`. Alle 77 tests slagen. `renderWithProviders` volgt in de pilot van Fase 1, zodra er een `QueryClient` is.
- [x] **React 18.3 deprecations**: onze eigen code bevat geen `defaultProps`, string refs, legacy context, `findDOMNode`, `ReactDOM.render` of `useRef()` zonder argument, en de tests geven geen React-waarschuwingen. Wat nog in de browserconsole verschijnt komt uit `asc-ui`/`wonen-ui` en verdwijnt met die libraries. Handmatig te controleren: de dev-console na inloggen.
- [x] `AGENTS.md` toegevoegd met de stack-, migratie-, dependency- en lintregels.

> **Gevonden tijdens Fase 0:** `@amsterdam/amsterdam-react-final-form` importeert `lodash/isEqual` zonder `lodash` als dependency te declareren. Dat werkte alleen omdat `eslint-config-react-app` toevallig `lodash` meeinstalleerde; zonder die package faalde de productie-build. `lodash` staat daarom nu expliciet in `dependencies` (zelfde versie als voorheen) en gaat in Fase 5 samen met `amsterdam-react-final-form` weer weg.

## Fase 1 — Datalaag naar TanStack Query ✅ afgerond (okt 2026)

Doel: `useApiRequest` en de `ApiProvider` vervangen door TanStack Query, zonder UI-wijzigingen.

### 1a. Infrastructuur

- [x] Installeren: `@tanstack/react-query`, `@tanstack/react-query-devtools` (dev).
- [x] Overnemen uit top-frontend-v2:
  - `src/api/queryClient.ts`: globale defaults (`retry: false`, `refetchOnWindowFocus: false`, `staleTime`) + globale error-toast via `QueryCache`/`MutationCache` met `meta.globalErrorToast` opt-out.
  - `src/api/useApiFetch.ts`: token-gebonden `fetch` wrapper (vervangt `axios` + `useRequestWrapper` + `useProtectedRequest`).
  - `src/api/queryKeys.ts`: hiërarchische key-factory. Maak één entry per huidige `ApiGroup` (`addresses`, `case`, `cases`, `fines`, `permissions`, `roles`, `task`, `themes`, `users`, …).
  - `src/api/utils/` (`makeApiUrl`, `normalizeApiError`, `stringifyQueryParams`).
- [x] `QueryClientProvider` in `App.tsx` **naast** de bestaande `ApiProvider` hangen (ze kunnen tijdelijk samen bestaan).
- [x] De huidige `useErrorHandler` / flash-message-afhandeling koppelen aan de `QueryCache.onError`, zodat foutmeldingen hetzelfde blijven.

### 1b. Hooks migreren, per `ApiGroup`

Nieuwe hooks in `src/api/hooks/<domein>.ts`. Mapping:

| Oud                                          | Nieuw                                                                |
| -------------------------------------------- | -------------------------------------------------------------------- |
| `const [data, { isBusy, execGet }] = useX()` | `const { data, isPending, refetch } = useX()`                        |
| `lazy: true`                                 | `enabled: false` (of `enabled: Boolean(param)`)                      |
| `keepUsingInvalidCache`                      | `placeholderData: keepPreviousData`                                  |
| `execPost/Patch/Put/Delete`                  | aparte `useMutation` hook per actie                                  |
| `clearCache()` (hele groep leeg)             | `queryClient.invalidateQueries({ queryKey: queryKeys.<groep>.all })` |
| `useResponseAsCache`                         | `queryClient.setQueryData(...)` in `onSuccess`                       |
| `updateCache(updater)`                       | `queryClient.setQueryData(key, old => ...)`                          |
| `usePollingRefetch`                          | `refetchInterval`                                                    |
| `useRequestQueue` (dedupe)                   | ingebouwd in TanStack Query                                          |
| `isMocked` / `useMockedRequest`              | MSW of mocks in tests; niet in productiecode                         |

Aanbevolen volgorde (klein → groot, weinig → veel consumenten):

1. `themes`, `roles`, `permissions`, `users`, `help`, `reasons`
2. `addresses`, `bagPdok`, `benkAgg`, `dataPunt`, `residents`, `fines`
3. `listing`, `schedules`, `processes`, `feedback`
4. `cases` (incl. de paginering/sorteerlogica), `case`, `tasks`

Per groep: hook herschrijven → alle consumenten aanpassen → oude hook verwijderen → testen.

> **🧪 Pilot: eerst één voorbeeld**
>
> Vóór de rest van de hooks wordt alleen dit omgezet:
>
> - **Lezen:** `themes` (`useThemes`). Klein en veel gebruikt, dus het effect is direct zichtbaar.
> - **Schrijven:** één mutatie, bijvoorbeeld `feedback` (POST). Daarmee is ook `useMutation` + invalidatie gedekt.
> - De infrastructuur uit 1a (`queryClient`, `useApiFetch`, `queryKeys`, foutafhandeling).
>
> Testen op acceptatie: data laadt goed, laadstatus klopt, een API-fout geeft dezelfde melding als voorheen, de cache wordt na een mutatie ververst en de React Query Devtools tonen de verwachte keys.
>
> **✅ Akkoord** op dit voorbeeld → pas daarna de overige groepen in de volgorde hierboven.

#### Status pilot: ✅ akkoord (okt 2026)

Wat er staat:

| Bestand                                             | Wat                                                                                                                                                                                                                        |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/api/useApiFetch.ts`                            | `fetch` met Bearer-token; gooit een `ApiError` (`status`, `message`, `url`, plus de JSON-body zoals `detail`); bij 403 → `/auth`, net als `useProtectedRequest`                                                            |
| `src/api/queryClient.ts`                            | Defaults (`retry: false`, `refetchOnWindowFocus: false`, `staleTime` 5 min) en een globale foutmelding met precies dezelfde titel en opbouw als de oude `useErrorHandler`; opt-out via `meta: { globalErrorToast: false }` |
| `src/app/state/flashMessages/flashMessageBridge.ts` | Laat de `QueryClient` (buiten React) de bestaande flash messages tonen; `FlashMessageProvider` registreert zich                                                                                                            |
| `src/api/queryKeys.ts`                              | Key-factory, nu alleen `themes`                                                                                                                                                                                            |
| `src/api/hooks/themes.ts`                           | `useCaseThemes()` → `useQuery` (vervangt de oude in `app/state/rest/themes.ts`)                                                                                                                                            |
| `src/api/hooks/feedback.ts`                         | `useCreateFeedback()` → `useMutation` (vervangt `app/state/rest/feedback.ts`, verwijderd)                                                                                                                                  |
| `src/test-utils/createQueryWrapper.tsx`             | Verse `QueryClient` per test                                                                                                                                                                                               |
| `src/api/**/__tests__`                              | 11 tests: fetch/headers/body, `ApiError`, 403-redirect, opmaak foutmelding, dedupe van `useCaseThemes`, POST van feedback                                                                                                  |

`QueryClientProvider` hangt in `App.tsx` naast de bestaande `ApiProvider`; de React Query Devtools staan alleen aan in development. Aangepaste consumenten: `Cases`, `Tasks`, `CreateForm`, `DebriefForm`, `ChangeSubjectForm` en `Feedback`. Die laatste gebruikt nu `isPending` in plaats van een eigen `loading`-state.

Bewuste verschillen met het oude gedrag:

- **Verversen:** de oude cache werd nooit opnieuw opgehaald tenzij hij ongeldig werd gemaakt. Nu zijn thema's 5 minuten "vers"; daarna worden ze bij het openen van een pagina op de achtergrond opnieuw opgehaald (de oude data blijft zichtbaar).
- **Foutmelding zonder `detail`:** toont nu de HTTP-statustekst (bijv. `Internal Server Error`) in plaats van de axios-tekst `Request failed with status code 500`.
- **Feedback** maakte bij de POST de cachegroep `supportContacts` leeg. Feedback verandert de supportcontacten niet, dus dat is niet overgenomen.

Testchecklist voor acceptatie:

- [x] Zakenoverzicht en takenoverzicht: het themafilter toont alle thema's en filteren werkt.
- [x] Zaak aanmaken: themakeuze werkt, ook via de TON-flow (alleen het TON-thema).
- [x] Debrief-formulier en "Onderwerp wijzigen" op zaakdetail: thema's laden.
- [x] Devtools (lokaal): één query `["themes","list"]`, ook als je tussen deze pagina's wisselt (geen dubbele requests in het Network-tabblad).
- [x] Feedback versturen: knop disabled met spinner tijdens versturen, daarna "Bedankt voor je feedback!" en de modal sluit.
- [x] Fout: zet in de Network-tab request blocking op `/themes/` of `/feedback/` → zelfde rode melding "Oeps er ging iets mis!" als voorheen, met de URL.
- [x] 403: een gebruiker zonder rechten komt op `/auth`, zoals nu.

#### Status uitrol

Principe: **per oude `ApiGroup` volledig migreren** (alle queries én mutaties van een groep tegelijk). Elke query-key begint met de groepsnaam. Voor de kleine groepen was dat genoeg: de oude `clearCache()` maakte alleen de eigen groep leeg, dus er was geen brug tussen oude en nieuwe cache nodig. De `cases`-groep (32 hooks) ging wél in delen over en had tijdelijk een brug nodig (zie de pilot hieronder); die is in 1c verwijderd.

Gaandeweg is het principe "1-op-1 met de oude groep" losgelaten voor mutaties: die werken nu alleen bij wat de gewijzigde data echt toont, vaak zonder refetch (zie de punten onder de pilot `cases`).

| Groep                                      | Status        | Hooks                                                                                                                                                       |
| ------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `themes`                                   | ✅            | `useCaseThemes`, `useReasons`, `useProjects`, `useSubjects`, `useTags`, `useTasksReasons`, `useTaskNames`, `useTaskOwners`                                  |
| `auth`                                     | ✅            | `useUsersMe` (`useIsAuthorized` verwijderd in Fase 2)                                                                                                       |
| `users`                                    | ✅            | `useUsers`                                                                                                                                                  |
| `roles`                                    | ✅            | `useRoles` (nog steeds mockdata, er is geen endpoint)                                                                                                       |
| `fines`, `listings`, `housingCorporations` | ✅            | `useFine`, `useListing`, `useCorporations`                                                                                                                  |
| `addresses`                                | ✅            | `useAddress` + `useUpdateAddress`, `usePermitDetails`, `usePermitsPowerBrowser`, `useMeldingen`, `useRegistrations`, `useResidents`, `useDistricts`         |
| `dataPunt`                                 | ✅            | `useBagPdok`, `useBagPdokByBagId`, `useBenkAgg`, `usePanorama`                                                                                              |
| `supportContacts`, `permissions`           | ✅ verwijderd | `useSupportContacts`, `usePermissions` (`/permissions/`) werden nergens gebruikt                                                                            |
| `cases`, `case`, `task`                    | ✅            | zie hieronder. De opzoeklijsten `useDecisionTypes`, `useQuickDecisionTypes`, `useScheduleTypes` en `useViolationTypes` zijn al over, met keys onder `cases` |

Gedaan tijdens de uitrol:

- `useApiFetch` heeft de optie `authenticated: false` voor externe API's (PDOK, BenkAgg, Panorama). De oude code stuurde daar geen token heen, en dat moet zo blijven. `Content-Type` gaat alleen nog mee bij een body, net als bij axios; zo blijft een GET naar een externe API een "simple" CORS-request.
- `useSuppressErrorHandler` → `meta: { globalErrorToast: false }` (vergunningen, meldingen, registraties, panorama).
- `UpdateSchedule` haalt planningstypes op met `enabled: isModalOpen` in plaats van een `useEffect` met `execGet` en een `eslint-disable`.
- `AddressHeader` haalt het adres uit onze eigen API op met `enabled: hasNoDocs` in plaats van een imperatieve `execGet().then(...)`. Bij een fout van die call crashte de oude `.then` op `response.data`; nu verschijnt dan "onbekend adres" in de melding.
- `ChangeHousingCorporation` gebruikt `useUpdateAddress` (met `isPending` in plaats van een eigen `loading`-state). De zaak-cache wordt nog via de oude `updateCache` bijgewerkt, tot `cases` over is.
- `isBusy` → `isLoading` (alleen `true` tijdens de eerste keer laden; een uitgeschakelde query is niet "loading").

> **🧪 Volgende pilot: `cases` / `case` / `task`**
>
> Deze groepen gebruiken patronen die de eerste pilot niet dekte:
>
> - **Cache direct aanpassen:** `updateCache` (`ChangeHousingCorporation`) en `useContextCache` (`SelectTask`, `AssignTask`, `Workflow/columns`, `Tasks`) → `queryClient.setQueryData` / `invalidateQueries`.
> - **Polling:** `usePollingRefetch` in `Workflow` → `refetchInterval`.
> - **Paginering, sortering en filters:** `useCases`, `useTasks` → `placeholderData: keepPreviousData`.
>
> Voorstel voor het voorbeeld: `useCase` + `useCaseWorkflows` met polling op de zaakdetailpagina, plus de `updateCache` in `ChangeHousingCorporation`. Na akkoord volgen het takenoverzicht (`useContextCache`) en de overige formulieren.

#### Status pilot `cases`: ✅ akkoord (okt 2026)

De `cases`-groep (32 hooks) gaat in delen over. Daarom is er een **tijdelijke brug tussen oude en nieuwe cache**, te verwijderen samen met de oude laag (1c):

- `useApiRequest`: een oude mutatie invalideert ook de TanStack-queries van haar groep, **pas nadat het verzoek klaar is**. Eerst gebeurde dat in `ApiProvider` bij `clearCache()`, maar de oude laag roept die vóór het verzoek aan. Oude GET's wachten via de request-queue netjes tot de mutatie klaar is, TanStack niet: die haalde de oude stand op terwijl de POST nog liep (gevonden bij het testen: na taak afronden bleef de oude taak staan). Getest in `useApiRequest.test.tsx`.
- `src/api/legacyCacheBridge.ts`: nieuwe mutaties kunnen gericht items in de oude cache bijwerken (`useUpdateLegacyCacheItem`) of als verouderd markeren op URL-prefix (`useInvalidateLegacyCacheItems`), in plaats van de hele groep te legen.

| Oud                                                                 | Nieuw                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useCase` (16 plekken)                                              | `useCase(caseId)`; uitgeschakeld zolang `caseId` ontbreekt                                                                                                                                                                                                                                                                                                 |
| `useCase().execPatch` (`ChangeTagForm`, `ChangeableSubject`)        | `useUpdateCase(caseId)` → werkt de caches bij zonder refetch (zie hieronder)                                                                                                                                                                                                                                                                               |
| `useCase().updateCache` (`ChangeHousingCorporation`)                | `useSetCaseData(caseId)` → `queryClient.setQueryData`                                                                                                                                                                                                                                                                                                      |
| `useExistingCase`: `lazy` + `execGet` in een `useEffect` + `errors` | `useCase(valid ? id : undefined)` + `error.status === 404`                                                                                                                                                                                                                                                                                                 |
| `useCaseWorkflows` + `usePollingRefetch`                            | `useCaseWorkflows(caseId, { pollWhileEmpty })` met `refetchInterval`: 1, 2, 4, 8, 16 s, max. 5 pogingen, geteld vanaf mount; geeft `isPolling` terug. Ook mislukte pogingen tellen mee (anders bleef een falend endpoint eeuwig gepold; gevonden bij nalopen, met test). Verschil: "Herlaad taken." telt nu als poging. `usePollingRefetch` is verwijderd. |
| `useContextCache` op de workflows (`Workflow/columns`)              | `useSetWorkflowTaskOwner(caseId)` → `setQueryData`                                                                                                                                                                                                                                                                                                         |

Verschil voor gebruikers: na een wijziging (tag, onderwerp, taak afronden) toonde de zaakpagina kort een volledig laadscherm, omdat de oude cache de data weggooide tijdens het verversen. Nu blijft de pagina staan en ververst hij op de achtergrond.

> **⚠️ Gevonden bij het testen: modals die "vanzelf" sloten.** Vijf modals op de zaakpagina sloten na opslaan niet zelf. Ze verdwenen alleen omdat het oude laadscherm de hele pagina (en dus de modal) opnieuw opbouwde. Nu de pagina blijft staan, bleven ze open. Opgelost door de modal te sluiten zodra het verzoek klaar is, ook bij een fout (die verschijnt als flash message, zoals voorheen):
>
> - tag (`ChangeTagForm`, nu met een `onSaved`-prop en een uitgeschakelde knop tijdens opslaan; met regressietest);
> - onderwerp (`ChangeableSubject`);
> - deadline (`ChangebleDueDate`);
> - planning (`UpdateSchedule`);
> - taak afronden (`FormModal`).
>
> **Bij elke volgende groep controleren:** zoek in de geraakte schermen naar `useModal()` en formulieren die na `exec*`/`mutate` niet zelf `closeModal` aanroepen of state resetten.

> **Gerichter invalideren (gevonden bij het testen).** Deadline wijzigen haalde daarna ook de zaak, workflows, events en schedules opnieuw op. Dat gebeurde al vóór de migratie: de oude `useTaskUpdate` zat in de `cases`-groep en een mutatie leegde de hele groep. Nu: `useUpdateTask(taskId, caseId)` ververst alleen `cases/:id/workflows/` direct, en markeert de (nog oude) takenlijsten `tasks/?…` als verouderd, zodat die pas laden als ze weer getoond worden. De backend maakt geen event aan voor een deadlinewijziging (zie `TypeEnum`), dus events hoeven niet mee. Hiervoor heeft de oude cache tijdelijk `invalidateCacheItems(urlPrefix)` gekregen.
>
> Planning wijzigen (`PATCH /schedules/:id/`): **geen enkele refetch.** `useUpdateSchedule(scheduleId, caseId)` werkt na de PATCH de gecachte `cases/:id/schedules/` (kolom "Urgentie") en het `SCHEDULE`-event in `cases/:id/events/` zelf bij. Dat event moet mee: de backend leest zijn waarden live uit de schedule, als namen (`CaseEvent.event_values` → `emitter.__get_event_values__()`). Daarom krijgt de hook de gekozen opties mét naam uit het formulier. Beide caches zitten nog in de oude laag; daarvoor is er tijdelijk `useUpdateLegacyCacheItem` in `src/api/legacyCacheBridge.ts`. Van 4 naar 0 requests.
>
> Tag en onderwerp wijzigen (`PATCH /cases/:id/`): **geen enkele refetch.** `useUpdateCase` neemt `tags` en `subjects` uit de response over in de gecachte zaak (de PATCH-serializer `CaseCreateSerializer` gebruikt voor deze velden dezelfde `TagSerializer`/`SubjectSerializer` als de GET; de rest van de response wijkt af en wordt dus niet overgenomen). Het `CASE`-event in de tijdlijn krijgt de nieuwe onderwerpnamen, want de backend leest die live uit de zaak (`Case.__get_event_values__`). Het zaken- en takenoverzicht (filterbaar op tag en onderwerp) worden alleen als verouderd gemarkeerd en laden pas bij het volgende bezoek. Van 4 naar 0 requests.
>
> Taak afronden (`POST /generic-tasks/complete/`): `useCompleteTask(caseId)` ververst ná de POST `cases/:id/workflows/` (volgende taak) en de events (de backend maakt een `GENERIC_TASK`-event). De zaak wordt alleen als verouderd gemarkeerd: het veld `workflows` verandert, wat deze pagina niet toont maar het besluitformulier wel gebruikt. De lijsten worden als verouderd gemarkeerd.
>
> **Pollen ook als al de eerste fetch faalt, en laden blijven tonen.** Eerst pollde `useCaseWorkflows` alleen bij een lege lijst; faalde al de eerste fetch, dan was er geen data en werd er niet gepold (de oude code deed dat wel, via `data?.results ?? []`). Nu telt "nog geen workflows" ook bij een fout zonder data, en `isPolling` blijft `true` tot de laatste poging, zodat `Workflow` laadregels blijft tonen. Daarnaast geldt een zaak in `Workflow` als open zolang de zaakgegevens nog laden (eerst gold hij dan als afgesloten, waardoor er niet gepold werd en kort "afgesloten" kon verschijnen).
>
> **Geen foutmelding voor workflows.** Op verzoek toont `useCaseWorkflows` nooit een foutmelding (`meta: { globalErrorToast: false }`): zonder workflows toont de tabel "Geen taken beschikbaar." met "Herlaad taken.". Getest met de echte `queryClient`.
>
> **Dubbele foutmeldingen (gevonden bij het testen).** Bij een falend `workflows/`-endpoint gaf elke mislukte pollpoging een eigen rode melding (5×). Dat deed de oude `usePollingRefetch` ook (en zelfs 6× bij een falende eerste fetch). Nu voegt de flash-message-reducer een melding die al op het scherm staat (zelfde niveau, titel en tekst) niet nog een keer toe. Dit geldt voor alle meldingen, ook uit de oude laag. Wegklikken haalt een melding nu ook uit de state (`removeFlashMessage`), zodat dezelfde fout later weer kan verschijnen; elke melding heeft een vaste `messageId` als React-key, zodat wegklikken niet de verkeerde melding verbergt.
>
> **Werkwijze:** controleer in `zaken-backend` welke responses de gewijzigde data bevatten (serializers, en `event_values` die live uit het emitter-object komen) voordat je een invalidatie weglaat.
>
> Dit is een bewuste afwijking van "1-op-1 met de oude groep". **Bij elke volgende mutatie afwegen:** welke queries tonen deze data echt? Andere oude mutaties in `cases` (taak afronden, planning wijzigen, besluiten, …) legen nog de hele groep; dat wordt bekeken als ze overgaan.

Testchecklist voor acceptatie (zaakdetailpagina):

- [x] Zaak openen: gegevens, kop, adres en paginatitel laden. Een niet-bestaand id (`/zaken/999999999`) toont "niet gevonden".
- [x] Gevoelige zaak zonder recht → "niet geautoriseerd", zoals nu.
- [x] Tag wijzigen en onderwerp wijzigen: de nieuwe waarde verschijnt, tijdlijn/events verversen ook. _(Tag: de modal bleef open, opgelost.)_
- [x] Woningcorporatie wijzigen: de nieuwe corporatie staat direct op de zaak.
- [x] Taak afronden: de takenlijst ververst en toont de volgende taak. Network: eerst de POST op `generic-tasks/complete/`, daarna pas `workflows/` en `events/`; geen `cases/:id/`. _(Gevonden: de GET's liepen vóór de POST, opgelost.)_
- [x] Een oude mutatie, bijv. een besluit of debrief opslaan: terug op de zaak staan de nieuwe gegevens (niet de stand van vóór het opslaan).
- [x] Nieuwe zaak aanmaken en direct openen: de takenlijst toont kort laadregels en vult zich binnen enkele seconden (polling). Network-tab: herhaalde `/workflows/`-requests met oplopende tussenpozen, die stoppen zodra er taken zijn.
- [x] Afgesloten zaak zonder taken: geen polling, wel de tekst "Deze zaak is afgesloten…" en "Herlaad taken." werkt.
- [x] Taak toewijzen vanuit de takenlijst op de zaak: de nieuwe behandelaar verschijnt direct.
- [x] Blokkeer `*/workflows/*` en open een zaak (ook als al de eerste fetch faalt): géén rode melding, de takenlijst blijft laadregels tonen terwijl er gepold wordt (requests na ±1, 3, 7, 15 en 31 s), daarna niets meer en "Geen taken beschikbaar." met "Herlaad taken.". Een afgesloten zaak toont direct "Deze zaak is afgesloten…" zonder te pollen.
- [x] Na opslaan sluit de modal bij: tag, onderwerp, woningcorporatie, deadline van een taak, planning van een bezoek, taak afronden.
- [x] Deadline wijzigen: na de PATCH alleen een request naar `cases/:id/workflows/` (niet naar de zaak, events of schedules). Daarna naar het takenoverzicht: dat toont de nieuwe deadline.
- [x] Tag en onderwerp wijzigen: na de PATCH géén andere requests. De nieuwe tag/onderwerpen staan direct op de zaak, de onderwerpen ook in het zaak-event in de tijdlijn. Daarna in het zakenoverzicht filteren op die tag: de zaak staat erbij.
- [x] Planning wijzigen: na de PATCH géén andere requests. De urgentie in de takenlijst én het planning-event in de tijdlijn tonen toch direct de nieuwe waarde, en na herladen van de pagina nog steeds.

#### Takenoverzicht: ✅ akkoord (okt 2026)

| Oud                                                                                                                    | Nieuw                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTasks` (+ `getQueryUrl`) in de oude `cases`-groep                                                                  | `useTasks(params)` met key `["cases", "tasks", params]` en `placeholderData: keepPreviousData`: bij een andere pagina, sortering of filter blijft de vorige lijst staan tot de nieuwe binnen is                       |
| Resultaten en aantal via `updateContextTasks` in `ValueProvider`                                                       | Direct uit de query. De filters staan nog wel in `ValueProvider` (zie 1c)                                                                                                                                             |
| Filter wijzigen → `clearContextCache()` leegde de hele oude `cases`-groep                                              | Niets nodig: een andere filter is een andere query-key                                                                                                                                                                |
| Toewijzen: `useTask().execPatch` + `useContextCache` met een nagebouwde lijst-URL, of `onOwnerChange` op de zaakpagina | `useAssignTask(taskId)`: werkt de eigenaar bij in álle gecachte takenlijsten én workflows, zonder refetch. `AssignTask` heeft geen `isEnforcement`/`onOwnerChange` meer nodig; `useSetWorkflowTaskOwner` is vervallen |
| `SelectTask` + `UserIcon`                                                                                              | Verwijderd: werden nergens gebruikt                                                                                                                                                                                   |

Let op: de taak-id is in de workflows een string (`case_user_task_id`, `CharField(source="id")`) en in de takenlijst een getal (`id`); `useAssignTask` vergelijkt daarom als string.

Andere mutaties (deadline, taak afronden, tag/onderwerp) markeren de takenlijsten nu via TanStack als verouderd (`queryKeys.cases.tasksAll`); ze laden pas bij het volgende bezoek aan het overzicht.

Testchecklist:

- [x] Takenoverzicht laden; aantallen kloppen; de handhavingsverzoeken staan bovenaan als die er zijn.
- [x] Bladeren, sorteren (o.a. slotdatum, straat) en paginagrootte wijzigen: de tabel toont laden en daarna de juiste taken.
- [x] Alle filters (thema, rol, taaknaam, behandelaar, aanleiding, project, onderwerp, tag, stadsdeel, corporatie) geven de juiste taken; bij een filterwijziging wordt alleen `tasks/?…` opgehaald.
- [x] Taak aan jezelf, aan iemand anders en aan niemand toewijzen (ook herverdelen met bevestiging): de eigenaar verandert direct, zonder extra requests na de PATCH. Ook in de tabel met handhavingsverzoeken.
- [x] Taak toewijzen op de zaakpagina: idem.
- [x] Taak toewijzen in het overzicht, dan de zaak openen (binnen 5 minuten): de takenlijst op de zaak toont de nieuwe behandelaar.
- [x] Deadline wijzigen of taak afronden op een zaak, dan terug naar het overzicht: de nieuwe stand wordt opgehaald.

#### Zakenoverzicht en zaken per adres: ✅ akkoord (okt 2026)

| Oud                                                                            | Nieuw                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useCases(14 losse argumenten)`                                                | `useCases({ ... })` met key `["cases", "list", params]` en `placeholderData: keepPreviousData`. Lege strings en lijsten blijven uit de query, zoals de oude `cleanParamObject` deed (getest: zelfde query string) |
| Resultaten en aantal via `updateContextCases` in `ValueProvider`               | Direct uit de query; de filters staan nog in `ValueProvider` (zie 1c)                                                                                                                                             |
| `useCasesByBagId` (adrespagina: zaken, advertenties, adresmenu; zaak aanmaken) | `useCasesByBagId(bagId, openCases?)` met key `["cases", "byAddress", bagId, { openCases }]`                                                                                                                       |

`app/state/rest/cases.ts` is verwijderd. Mutaties die zaak- of takenlijsten raken (tag/onderwerp, taak afronden) markeren nu alle lijsten via `invalidateCaseAndTaskLists` als verouderd; ze laden pas als ze weer getoond worden. Oude mutaties in de `cases`-groep (zaak aanmaken, besluiten, …) invalideren ze via de brug in `useApiRequest`, zoals voorheen.

Testchecklist:

- [x] Zakenoverzicht laden; het aantal klopt.
- [x] Bladeren, sorteren (straat, postcode, aanleiding, startdatum, laatst gewijzigd) en paginagrootte wijzigen.
- [x] Alle filters (thema, aanleiding, project, onderwerp, tag, stadsdeel, corporatie, open/gesloten, startdatum) en de zoekbalk op adres. Een leeg gemaakt filter verdwijnt uit de query (Network: geen `theme_name=` zonder waarde).
- [x] Gevoelige zaken alleen met het recht daarvoor; zonder recht bij Ondermijning de juiste lege tekst.
- [x] Adrespagina: de zaken op het adres, de advertenties en het adresmenu (aantal zaken).
- [x] Zaak aanmaken op een adres met bestaande zaken: de melding over bestaande zaken klopt. Na het aanmaken toont de adrespagina de nieuwe zaak.
- [x] Tag wijzigen op een zaak, dan in het zakenoverzicht op die tag filteren: de zaak staat erbij.

#### Zaakformulieren en overige `cases`-hooks: ✅ akkoord (okt 2026)

**Alle hooks uit `app/state/rest` zijn nu over.** Geen component gebruikt de oude laag nog; alleen `ApiProvider` hangt nog in `App.tsx` (weg in 1c).

| Oud                                                                                                                                                                         | Nieuw                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useDebriefingCreate`, `useSummons`, `useDecisions`, `useQuickDecisions`, `useCaseClose`, `useCitizenReports`, `useVisitsCreate`, `useScheduleCreate`, `useWorkflowProcess` | `useCreateDebriefing`, `useCreateSummon`, `useCreateDecision`, `useCreateQuickDecision`, `useCloseCase`, `useCreateCitizenReport`, `useCreateVisit`, `useCreateSchedule`, `useStartWorkflowProcess`, allemaal via `useCaseFormMutation(caseId, url)` |
| `useCaseCreate`                                                                                                                                                             | `useCreateCase`                                                                                                                                                                                                                                      |
| `useCaseEvents`, `useSchedulesByCaseId`, `useSummonsWithCaseId`, `useCaseCloseReasons`/`Results`, `useWorkflowProcesses`, `useSummonTypesByTaskId`                          | Dezelfde namen in `src/api/hooks` (`useSummonsWithCaseId` → `useSummonsByCaseId`)                                                                                                                                                                    |
| `useCorrespondence(s)`, `useCaseVisits`                                                                                                                                     | Verwijderd: werden nergens gebruikt                                                                                                                                                                                                                  |

- **Na opslaan van een formulier** wordt alles van die zaak (`["cases", caseId, …]`) plus de zaak- en takenlijsten als verouderd gemarkeerd, **zonder** direct op te halen (`refetchType: "none"`). Op het formulier zelf gaat er dus niets extra's uit; terug op de zaakpagina laadt precies wat daar getoond wordt één keer. De oude laag leegde de hele groep en haalde ook alles op wat op het formulier zichtbaar was.
- **`toPostMethod`** (`src/api/utils/toPostMethod.ts`) koppelt een mutatie aan het `postMethod`-contract van de oude formulieren (`{ data }` bij succes, `undefined` bij een fout). Weg in Fase 3.
- **Afsluitformulier:** de oude `useCaseClose()` stond niet op `lazy` en deed bij openen een GET op `case-close/` (alle afsluitingen). Die is weg.
- Events en schedules staan nu in TanStack, dus de tijdelijke koppelingen naar de oude cache (planning, tag/onderwerp, taak afronden) zijn gewone `setQueryData`/`invalidateQueries` geworden. `legacyCacheBridge.ts` is verwijderd.

Testchecklist (per formulier: invullen, bevestigen, terug op de zaak):

- [x] Debrief, besluit, snel besluit, dagvaarding (dagvaardingstypes per taak gevuld), bezoek, melding, planning aanmaken, zaak afsluiten (redenen en resultaten gevuld), taak opvoeren (processen gevuld).
- [x] Na elk formulier: terug op de zaak staat de nieuwe stand (takenlijst, tijdlijn, en bij afsluiten "Deze zaak is afgesloten…"). Network: op het formulier na de POST geen extra GET's; op de zaakpagina één keer de gegevens van de zaak.
- [x] Een formulier dat op de server faalt: foutmelding, je blijft op het formulier.
- [x] Besluitformulier: de lijst met dagvaardingen bovenaan laadt.
- [x] Zaak aanmaken: na opslaan naar de nieuwe zaak; het zakenoverzicht en de adrespagina tonen hem.
- [x] Afsluitformulier openen: géén GET op `case-close/` meer.
- [x] Tijdlijn en overlastmelding (`CaseNuisanceAlert`) op de zaakpagina tonen de events.

### 1c. Opruimen ✅ (getest, okt 2026)

- [x] De hele oude laag `src/app/state/rest/` is verwijderd: `ApiProvider`, `useApiRequest`, de request-queue, `useApiCache`, `useContextCache`, de mock-requests, `errorHandler`, `cleanParamObject` en de brug in `useApiRequest`. `ApiProvider` is uit `App.tsx`.
- [x] Wat nog gebruikt werd is verhuisd: `makeApiUrl`/`makeTonApiUrl` → `src/api/utils/makeApiUrl.ts`; `useHasPermission` (samengevoegd met `usePermissions`, met test; de oude "zoek dubbelen"-check — samengevoegde lijsten in een `Set` — is vervangen door `permissionsToCheck.some(p => permissions.includes(p))`, die geen onterechte toegang meer geeft bij een dubbel recht in de lijst van de gebruiker of in de vraag), `useOtherAddressesByBagId` en `usePanoramaByBagId` → `src/hooks/` (de doelmap uit Fase 5).
- [x] Dependencies weg: `axios`, `qs`, `lodash.merge`, `lodash.isempty` (+ `@types/qs`, `@types/lodash.merge`, `@types/lodash.isempty`). De build controleert dat geen andere library er stilletjes op leunde.
- [ ] `immer` blijft nog: gebruikt door `useFlashMessagesReducer` en `ShowHide` (gaan weg met de flash messages → toasts in Fase 2 en `ShowHide` in Fase 3).
- [x] `ValueProvider`: de ongebruikte `results`/`count` zijn weg; alleen de filterwaarden staan er nog in.
- [ ] `ValueProvider` vervangen door de URL (search params) voor de filters van het zaken- en takenoverzicht. Zakenoverzicht: gedaan in Fase 2 (stap 3 van het zakenoverzicht, zie daar). Takenoverzicht: volgt met die pagina.

Testchecklist (de app moet zich precies zo gedragen als na de vorige stappen):

- [x] Inloggen, startpagina, zakenoverzicht, takenoverzicht, zaakpagina, adrespagina, een formulier: alles laadt, geen fouten in de console (behalve de bekende `defaultProps`-waarschuwingen van `asc-ui`).
- [x] Knoppen en menu's die van rechten afhangen (taak afronden/toewijzen, gevoelige zaken) verschijnen zoals voorheen.
- [x] Adrespagina: andere adressen (huisletter/toevoeging) en het panorama.
- [x] Filters in zaken- en takenoverzicht blijven bewaard als je naar een zaak gaat en terugkomt.

## Fase 2 — Amsterdam Design System-fundament (pilot akkoord, okt 2026)

Doel: ADS geïnstalleerd en gedeelde bouwstenen klaar, terwijl asc-ui nog gewoon werkt.

- [x] Installeren: `@amsterdam/design-system-assets`, `-css`, `-react`, `-react-icons`, `-tokens` (versies als top-frontend-v2). `@amsterdam/ee-ads-rhf` en `react-hook-form` volgen bij het eerste formulier (Fase 3).
- [x] Global CSS in `src/index.css` (geïmporteerd in `index.tsx`), zoals in top-frontend-v2: fonts, `design-system-css`, tokens (+ `compact.css`), `styles/design-system-overrides.css`. Gecontroleerd: de ADS-CSS bevat geen enkele globale element-selector (alleen `.ams-*`, tokens op `:root` en `@font-face`), dus de asc-ui-pagina's merken er niets van.
- [x] `src/app/components/shared/ams-tokens.css` verwijderd: de officiële tokens bevatten alles (ook de avatar-tokens). Let op: `compact.css` maakt o.a. randen dunner, dus de avatar in het takenoverzicht kan iets anders ogen.
- [ ] Gedeelde componenten neerzetten in `src/components/`, waar mogelijk overgenomen uit top-frontend-v2:
  - [x] `src/components/DefaultLayout/` (ADS `Page withMenu`, `PageHeader`, `Menu`, `Breadcrumb`, `Alert`, `SkipLink`), naar het voorbeeld van top-frontend-v2 → vervangt per pagina `app/components/layouts/DefaultLayout` (asc-ui `Header`, `MenuInline`/`MenuToggle`, `BreadCrumbs`, `FlashMessages`, `SkipLinks`, `MainWrapper`). Zie de pilot hieronder.
  - `toasts/` (ToastProvider + `toastBridge`) → vervangt `FlashMessageProvider` + `immer` reducer.
  - `Table` → vervangt `wonen-ui` `Table`/`LoadingRows`.
  - `Card`, `spinners/AmsterdamCrossSpinner`, `ErrorState`, `ConfirmDialog` (ADS `Dialog` → vervangt asc-ui `Modal`).
  - `CaseEventTimeline` → vervangt `wonen-ui` `EventsTimeline`.
- [ ] Een gedeelde formulier-basis: `src/forms/` met `mapToOptions` en een `FormActions`/`SubmitButton` patroon.

> **🧪 Pilot: eerst één voorbeeld**
>
> Installeer ADS en de global CSS en zet de nieuwe layout op **één** bestaande pagina (de 404-pagina). De rest van de app blijft op asc-ui.
>
> Testen: ADS en asc-ui botsen niet (fonts, `GlobalStyle`-resets, spacing), de pagina ziet er goed uit op desktop en mobiel en er zijn geen regressies op de andere pagina's.
>
> **✅ Akkoord** → daarna **pagina voor pagina** (afgesproken werkwijze): per pagina de oude layout wisselen voor de nieuwe en de inhoud omzetten, met een controle door jou na elke pagina. Gedeelde componenten (Card, Table, …) worden gebouwd zodra de eerste pagina ze nodig heeft.
>
> **Een pagina is klaar** als hij (inclusief de componenten die alleen hij gebruikt) niets meer gebruikt van `@amsterdam/asc-ui`, `styled-components`, `@amsterdam/wonen-ui` en `@amsterdam/amsterdam-react-final-form`/`react-final-form`. Zie de mappings in Fase 3. `@amsterdam/ee-ads-rhf` en `react-hook-form` worden geïnstalleerd bij de eerste pagina met een formulier.
>
> Stand bij de start (okt 2026): `wonen-ui` in 32 bestanden (`DefinitionList` 7×, `Table` 6×, `DateDisplay` 6×, `CaseIdDisplay` 4×, `SmallSkeleton` 2×, `List` 2×, `Residents`, `PermitsOverview`, `PermitsSynopsis`, `LoadingRows`, `EventsTimeline` 1×); `amsterdam-react-final-form` in 37 (`FormPositioner` 25×, `ScaffoldForm` 8×, scaffold-velden); `react-final-form` in 3; `asc-ui` in 90; `styled-components` in 23.

#### Status pilot: ✅ akkoord (okt 2026)

- **Layout** `src/components/DefaultLayout/DefaultLayout.tsx`: `PageHeader` met "Amsterdamse Zaak Administratie <omgeving>" (kort: "AZA <omgeving>") en logo-link naar `/`; menu (in de header op smalle schermen, links op brede) met Zaken, Taken, Invordering, Digitaal toezicht (externe link naar TON, nieuw tabblad), Zoeken, Hulp en "Uitloggen (<voornaam>)". Daaronder breadcrumbs en flash messages.
- **Bewuste verschillen met de oude layout:**
  - Menu-items waarvoor je geen recht hebt worden **verborgen** (zoals top-frontend-v2). Invorderingscheck stond eerst uitgeschakeld in beeld.
  - Flash messages zijn ADS-`Alert`s: rood bij een fout, groen bij succes (eerst blauw).
  - De voornaam staat bij "Uitloggen" in het menu, niet meer rechtsboven.
  - De zwevende feedbackknop is nog de oude (asc-ui); die gaat mee als het feedback-component aan de beurt is.
- **Pilotpagina:** `app/pages/errors/NotFoundPage.tsx` (ADS `Heading` + `Paragraph`).
- **Tests:** rendertest van de layout via de 404-pagina (menu met/zonder rechten, externe link, flash message tonen en wegklikken). `src/test-utils/setupTests.ts` bootst `matchMedia` na, die ADS gebruikt en jsdom niet heeft.
- **Menulabels** zijn kort en staan vast in de layout ("Zaken", "Taken", "Invordering"): het menu is smal en langere woorden (Zakenoverzicht, Invorderingscheck) werden afgebroken met een koppelteken. De paginatitels in `routes` blijven voluit.
- Gevonden bij het testen: **geen iconen te zien.** ADS rendert sommige elementen met het `hidden`-attribuut en toont ze pas via de eigen CSS (zodat ze verborgen blijven tot de CSS geladen is). De `GlobalStyle` van asc-ui (`normalize()` van polished) voegt `[hidden] { display: none }` toe ná onze CSS, met hetzelfde gewicht, en verbergt ze dus allemaal. `src/styles/design-system-overrides.css` zet de bedoelde `display` terug voor `.ams-icon`, de checkbox-/radio-markering, paginerings- en tabnavigatielabels, en voor de menuknop in de header (daardoor ontbrak op smalle schermen het hele menu). Weg samen met asc-ui (Fase 5).
- **Menu-iconen:** de gevulde variant (`…FillIcon`) waar die bestaat, zoals ADS voorschrijft. Zaken heeft de map (`FolderFillIcon`).
- **CSS-volgorde:** `index.css` (ADS) wordt in `index.tsx` als eerste geïmporteerd, vóór `App`. Anders komen de ADS-regels in de bundel ná de CSS Modules en winnen ze bij gelijk gewicht, waardoor pagina-CSS ADS niet kan overschrijven (gevonden bij de 404: `.ams-icon` heeft `align-self: baseline`, wat het centreren van het icoon tenietdeed).
- **Pagina-opbouw:** ADS v4 staat in compact mode: grijze pagina (`--ams-color-background-body`) met witte `Grid.Cell`-vlakken. De layout zet de inhoud in een `Grid` (`paddingVertical`/`gapVertical` "large"); **elke pagina levert één of meer `Grid.Cell`s** (zoals top-frontend-v2). Breadcrumbs en flash messages zijn transparante cellen die alleen verschijnen als er iets te tonen is.
- **404-pagina** zoals in top-frontend-v2: direct op de grijze achtergrond (transparante cel), met verdrietig gezicht, "404 – Oeps! We zijn de weg even kwijt.", uitleg en een knop "Terug naar de startpagina"; opmaak in `src/components/ErrorPage/ErrorPage.module.css` (gedeeld met de 403).

Testchecklist:

- [x] Ga naar een niet-bestaande url (bijv. `/bestaat-niet`): de 404-pagina in de nieuwe layout, direct op de grijze achtergrond; de knop gaat naar de startpagina.
- [x] Het menu toont iconen (breed én smal scherm).
- [x] Smal scherm (smaller dan 1160 px): de menuknop staat rechts in de header en klapt het menu open en dicht; op een breed scherm is de knop weg en staat het menu links.
- [x] Header: naam van de app met omgeving; het logo gaat naar de startpagina zonder volledige herlaad.
- [x] Menu op een breed scherm (links) en smal scherm (menuknop in de header): alle items werken, zonder volledige herlaad en zonder afgebroken labels; Invordering en Digitaal toezicht alleen met het recht; Digitaal toezicht opent TON in een nieuw tabblad.
- [x] "Uitloggen (<voornaam>)" logt uit.
- [x] Toetsenbord: Tab vanaf de bovenkant toont "Direct naar: inhoud".
- [x] De andere pagina's (asc-ui) zien er precies hetzelfde uit als voorheen, ook de avatar in het takenoverzicht.

#### Pagina voor pagina

| Pagina                                                       | Status                                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 404 (`pages/errors/NotFoundPage`)                            | ✅ akkoord (pilot)                                                              |
| Hulp (`pages/help/HelpPage`)                                 | ✅ akkoord                                                                      |
| 403 (`pages/auth/NotAuthorizedPage`)                         | ✅ akkoord                                                                      |
| Gebruiker (`pages/auth/AuthPage`, `/auth`)                   | ✅ akkoord (pilot `Description`)                                                |
| Invorderingscheck (`pages/fines/FinePage`, `/invorderingen`) | ✅ akkoord                                                                      |
| Adres zoeken / start (`pages/home/HomePage`, `/`)            | ✅ akkoord                                                                      |
| Zakenoverzicht (`pages/cases/index/IndexPage`, `/zaken`)     | stap 1 en 2 ✅ akkoord; stap 3 van 3 (filters in de URL) omgezet, wacht op test |

**Hulp-pagina:** naar het voorbeeld van de veelgestelde-vragenpagina van top-frontend-v2: titel "Hulp" direct op de grijze achtergrond, daaronder één wit vlak met de vier onderwerpen in een ADS-`Accordion` (dicht bij het openen, net als eerst). Geen icoon meer naast de paginatitel. **Breadcrumbs** staan alleen nog op geneste pagina's: een pagina direct onder home (zoals `/hulp`) krijgt er geen. De lijstjes stonden in de oude versie binnen een alinea (ongeldige HTML); dat zijn nu losse ADS-lijsten. `EmailLink` zit in `HelpContent`; het ongebruikte `PhoneLink` en `HelpContent.module.css` zijn weg. `CustomTooltip` staat nog in dezelfde map omdat de zaakpagina's het gebruiken.

Testchecklist Hulp:

- [x] `/hulp`: titel "Hulp", geen breadcrumbs, wit vlak met de vraag en vier onderwerpen.
- [x] Elk onderwerp klapt open en dicht; de tekst is gelijk aan de oude pagina, op de zin "We zijn momenteel bezig met het bijwerken van deze paragraaf…" na (weggehaald).
- [x] Support: het refresh-icoon staat netjes in de zin; de e-mailadressen openen je mailprogramma.
- [x] Smal scherm: de pagina blijft leesbaar.

**403-pagina:** zelfde opzet als de 404 (icoon, kop, uitleg, knop "Terug naar de startpagina"), met een slotje en "403 – Geen toegang". De opzet staat nu in het gedeelde `src/components/ErrorPage/` (de 404 gebruikt het ook; de CSS van de 404 is daarheen verhuisd). De tekst zegt "je bent" in plaats van "u bent", zoals de rest van de app. De pagina verschijnt bij een route waarvoor je het recht mist (`AuthorizedPage`) en bij een zaak die je niet mag inzien.

Testchecklist 403:

- [x] Ga naar `/403` (testroute die de 403-pagina altijd toont), of open een pagina waarvoor je geen recht hebt (bijv. `/invorderingen` zonder het recht voor de invorderingscheck): de 403-pagina in de nieuwe layout, met slotje en de knop naar de startpagina.
- [x] De 404-pagina (`/bestaat-niet`) ziet er nog precies zo uit als bij de pilot.

**Gebruikerspagina (`/auth`) — pilot `Description`:** de pagina waar je op uitkomt als de API een 403 geeft. Titel "Microsoft Entra-ID gebruiker" op de grijze achtergrond (was een h2, is nu de h1 van de pagina), daaronder een wit vlak met voornaam, achternaam en e-mail. De melding over de Keycloak-groepen (`NotAuthorizedAlert`) is weg: Keycloak wordt niet meer gebruikt. Daarmee zijn ook de hook `useIsAuthorized`, de query key en het type `IsAuthorizedResponse` verwijderd (werden nergens anders gebruikt).

- Nieuw gedeeld component `src/components/Description/` (overgenomen uit top-frontend-v2, op de ADS-`DescriptionList`): een lijst van `{ label, value }`; regels zonder waarde vallen weg. Vervangt `DefinitionList` van `wonen-ui`, dat nog op 6 plekken staat (`CaseDetails` 2×, `FinesSearchResult`, `ConfirmScaffoldFields`, `ObjectDetails`, `PermitOverview`, `DecisionHeader`). Die gebruiken ook `title`, `loading`/`numLoadingRows`; dat komt erbij zodra de eerste pagina het nodig heeft.
- **Testroute `/403`** toont altijd de 403-pagina (staat in `pages/auth/routes.tsx`, ook in productie; onschuldig).
- **Tests van pagina's** importeren eerst `app/routing/routes`, net als de app: pagina → layout → `Breadcrumbs` → `routes` → pagina is circulair, en met de pagina als startpunt is die pagina nog `undefined` als `routes` wordt opgebouwd.

Testchecklist `/auth`:

- [x] `/auth`: titel, wit vlak met je voornaam, achternaam en e-mail naast de labels.
- [x] Smal scherm: labels en waarden blijven leesbaar.

**Invorderingscheck (`/invorderingen`):** titel en uitleg op de grijze achtergrond, daaronder een wit vlak met het zoekveld (ADS `SearchField`, met zoekknop) en het resultaat.

- Zoeken gaat nog steeds bij Enter of de zoekknop; het kenmerk blijft in de URL staan (`?query=…`), zodat herladen hetzelfde resultaat geeft. Het veld toont nu ook wat je typt (in de oude versie stond `value` vast op de laatste zoekopdracht).
- Resultaat: per beschikking een `Description` met Kenmerk, Status en Datum. De datum komt uit het nieuwe `src/shared/dateFormatters.ts` (`formatDate`, overgenomen uit top-frontend-v2, DD-MM-YYYY) in plaats van `DateDisplay` van `wonen-ui`.
- Tijdens het zoeken staat er "Zoeken naar de beschikking…" (was een asc-ui-`Spinner`), zoals het zoekscherm van top-frontend-v2.
- **Bewust anders:** het info-knopje (i) achter "5 werkdagen" opende een modal met één zin. Die zin staat nu gewoon in de tekst ("Binnen die termijn wordt de eerste factuur naar de overtreder verstuurd."). De gedeelde `InfoButton` (asc-ui-modal) blijft bestaan voor de formulieren.
- Weg: `fines/hooks/useValues.tsx`.

Testchecklist invorderingscheck:

- [x] `/invorderingen`: titel, uitleg, zoekveld met focus; geen breadcrumbs.
- [x] Zoek op een bestaand kenmerk: Kenmerk, Status en Datum (DD-MM-YYYY) verschijnen; de URL krijgt `?query=…`; herladen toont hetzelfde resultaat met het kenmerk in het veld.
- [x] Zoek op een onbekend kenmerk: de uitleg dat de beschikking nog niet bekend is.
- [x] Zonder het recht `access_recovery_check`: de 403-pagina.
- [x] Smal scherm: zoekveld en resultaat blijven bruikbaar.

**Startpagina (`/`, "Adres zoeken"):** titel "Adres zoeken" op de grijze achtergrond (de zin "Ook om een nieuwe zaak aan te maken op een specifiek adres" is weg), daaronder een wit vlak met de h2 "Bekijk een adres", het zoekveld (ADS `SearchField`) en de gevonden adressen.

- Zoeken: tijdens het typen (na 750 ms, zoals eerst) en nu ook direct bij Enter of de zoekknop. De zoekterm staat in de URL (`?query=…`) via `useSearchParams` van React Router in plaats van `useURLState`.
- Onder het zoekveld staat altijd een regel, zoals in top-frontend-v2: "Voer minimaal 3 tekens in om te zoeken.", "Zoeken naar adressen..." (was een laadrij), "Geen adressen gevonden." of "**4** adressen gevonden voor "tjask"", met "(maximaal 25 getoond)" erachter als PDOK het maximum teruggeeft (`BAG_PDOK_MAX_RESULTS` in `api/hooks/dataPunt.ts`).
- Resultaat: een ADS-`LinkList` (naar het voorbeeld van `AddressSearch` in keuzewijzeraardgasvrij-frontend); elk adres is zelf de link naar de adrespagina. Eerst was dit een tabel met een klikbare rij en een losse "Bekijk"-link, maar één kolom met links is geen tabeldata.
- Mislukt het zoeken bij PDOK, dan staat er een rode `Alert` "Niet gelukt" (eerst leek het dan alsof er geen adressen waren).
- **De `Table`-pilot is verplaatst** naar het eerste overzicht (taken of zaken): daar is het echte tabeldata en zijn sorteren en paginering nodig. Het eerder gebouwde `src/components/Table/` is weer verwijderd.
- **Bewust anders:** de kop "Home" en de twee blokken "Takenoverzicht" en "Invorderingscheck" (`HomeMenu`) zijn weg; die staan al in het menu. Het menu-item heet "Zoeken"; de pagina zelf "Adres zoeken".
- Weg: `components/home/HomeMenu`, `search/SearchResults/columns.tsx`.

Testchecklist startpagina:

- [x] `/`: titel "Adres zoeken", de kop "Bekijk een adres", zoekveld met focus.
- [x] Typ een adres (minstens 3 tekens): na een korte pauze verschijnt de lijst met adressen; Enter of de zoekknop zoekt direct.
- [x] Onder het zoekveld: eerst "Voer minimaal 3 tekens in om te zoeken.", bij resultaten het aantal met de zoekterm (bij een ruime zoekterm met "(maximaal 25 getoond)"), en bij een onzin-zoekterm "Geen adressen gevonden."
- [x] Klik op een adres: de adrespagina opent. Ga terug: de zoekterm en de resultaten staan er nog.
- [x] Inloggen vanaf een diepe link (bijv. een zaak) brengt je na het inloggen nog steeds naar die pagina.
- [x] Smal scherm: zoekveld en lijst blijven bruikbaar.

**Zakenoverzicht (`/zaken`) — in drie stappen** (afgesproken):

1. **Layout + tabel (pilot `Table`)** — ✅ akkoord.
2. **Filters** naar ADS + `react-hook-form` + `@amsterdam/ee-ads-rhf` (installeren is akkoord). De filters komen **boven de tabel** in plaats van ernaast, naar het voorbeeld van `zwd-frontend` (`CasesFilters` + `ActiveFilters` op `CasesPage`); de multiselects worden de react-select uit `@amsterdam/ee-ads-rhf`.
3. **Filters naar de URL** (het restpunt uit Fase 1; nu staan ze in `ValueProvider`).

Stap 1:

- Nieuw gedeeld component `src/components/Table/` op de ADS-`Table`, naar de tabellen van zwd-frontend en top-frontend-v2: `columns` (`header`, `dataIndex`, `render`, `minWidth`), `data`, `loading`, `numLoadingRows`, `emptyPlaceholder`, `pagination` en `onChange`. Pagineren werkt op de eigen rijen, of van buitenaf (de API pagineert) via `pagination.collectionSize` en `onChange`. Paginering is de ADS-`Pagination`.
- **Sorteren zit niet in de tabel** (bewuste keuze): geen klikbare kolomkoppen, maar een aparte select "Sorteren op" boven de tabel (`cases/CasesSorting`, bijv. "Straat A-Z", "Startdatum nieuw-oud"). De tabel toont de rijen in de volgorde van de API. De overige vier plekken met de `wonen-ui`-tabel (`TableTasks`, `Workflow`, `OtherAddressesTable`, `CasesByBagId`) sorteren nu nog via de kolomkop; bij het omzetten krijgen ze zo nodig ook een select.
- Nieuw `src/components/SmallSkeleton/` (uit zwd-frontend) voor de laadrijen; vervangt later ook `SmallSkeleton` van `wonen-ui`.
- **Geen klikbare rij** (bewuste keuze, voor toegankelijkheid): een rij-klik werkt niet met toetsenbord of schermlezer en zit tekst selecteren en Ctrl-klik in de weg. **Eén patroon voor alle tabellen:** de laatste kolom heeft een echte link "Zaakdetails" (ADS `StandaloneLink`, met pijltje; geen `LinkList.Link`, want dat is een lijstitem en hoort in een `LinkList`) (voor de schermlezer "Zaakdetails van zaak 12, Amstel 1-H"), en die kolom staat op elke schermbreedte. Het ID en het adres zijn gewone tekst: een adres kan meerdere zaken hebben, en het takenoverzicht heeft geen ID-kolom (een rij is daar een taak), dus alleen de link-kolom is overal hetzelfde. Het gedeelde `Table`-component heeft daarom geen `onClickRow`; de andere tabellen volgen dezelfde lijn.
- De kolommen zijn getypeerd op `Case` (geen `any` meer); datums via `formatDate`. Datums en postcode breken niet af (`noWrap`); de kop "Zaak ID" is "ID". Het aantal laadrijen is gelijk aan het aantal zaken per pagina, zodat de tabel niet verspringt.
- Zoekveld: ADS `SearchField`; zoekt tijdens het typen (750 ms) en direct bij Enter. Het veld toont nu wat je typt (stond eerst vast op de laatste zoekopdracht).
- Niet meer: de vastgezette laatste kolom (`lastColumnFixed`); de tabel schuift als geheel zijwaarts als hij niet past.

Testchecklist zakenoverzicht stap 1 (✅ akkoord):

- [x] `/zaken`: titel met het aantal zaken, zoekveld, tabel met zaken in de nieuwe layout.
- [x] "Sorteren op" (rechts van het zoekveld): elke keuze sorteert de lijst en zet je terug op pagina 1; de kolomkoppen zijn niet meer klikbaar.
- [x] Paginering onder de tabel: volgende/vorige en een paginanummer; tijdens het laden staan er laadrijen.
- [x] Klik op "Zaakdetails": de zaak opent (ook met Tab + Enter, en met Ctrl-klik in een nieuw tabblad). De rest van de rij is niet klikbaar. Ga terug: pagina, sortering en filters staan er nog.
- [x] Zoeken op straat of postcode filtert de lijst; het aantal in de titel verandert mee.
- [x] De oude filters werken nog (thema, aanleiding, stadsdeel, aantal per pagina, …).
- [x] Smaller scherm: minder kolommen ("Zaakdetails" blijft altijd staan) en de tabel schuift zo nodig zijwaarts.
- [x] Het takenoverzicht (nog oud) werkt nog precies zoals eerst.

Stap 2 (filters) — ✅ akkoord:

- De filters staan **boven de tabel** in één rij die afbreekt naar een volgende regel (naar zwd-frontend), in plaats van een kolom ernaast of eronder. De volgorde loopt van "welke zaken" naar "hoe ze getoond worden": Zoeken, Thema, Aanleiding, Stadsdelen, dan de filters achter de knop **"Alle filters"** (Projecten, Onderwerpen, Tags — alleen bij een thema dat ze heeft —, Corporaties, Startdatum en als laatste Toon zaken, want gesloten zaken zoek je zelden), en tot slot de weergave: Sorteren op en Items per pagina. Staat er bij het openen van de pagina al zo'n filter aan, dan zijn ze meteen zichtbaar.
- **Zoeken en sorteren staan in dezelfde rij** als de filters, met het label erboven ("Zoeken", "Sorteren op"); de rij breekt als geheel af.
- De keuzelijsten met één keuze waren radioknoppen en zijn nu een ADS-`Select`. De lijsten met meerdere keuzes waren een zoekveld met aanvinkvakjes en zijn nu de doorzoekbare multiselect (react-select) uit `@amsterdam/ee-ads-rhf`.
- **"Zonder corporatie" zit in het filter Corporaties**, als eerste optie, en sluit de corporaties uit (en andersom): de API combineert de twee met "en", dus samen gaven ze altijd een lege lijst. Wil je later "of" (Ymere plus zonder corporatie), dan moet `housing_corporation`/`housing_corporation_isnull` in zaken-backend worden aangepast (zaken én taken); het scherm hoeft daar niet voor te veranderen.
- De knoppen "Alle filters" en "Wis alle filters" zijn **primair** (keuze, gelijk aan zwd-frontend); dat geldt straks ook voor het takenoverzicht.
- **"Wis alle filters"** verschijnt zodra er een filter afwijkt van de standaard of er een zoekterm staat, en maakt ook het zoekveld leeg; sortering en aantal per pagina blijven staan.
- Gedeelde bouwstenen in `src/components/filters/`: `SelectFilter`, `MultiSelectFilter` (om `SelectInput` van ee-ads-rhf) en `filters.module.css`. Het takenoverzicht kan ze hergebruiken.
- **Geen react-hook-form-formulier om de filters** (afwijking van het plan): een filter werkt direct, zonder verzenden of validatie, dus het zijn gewone gestuurde velden, net als in zwd-frontend. De `...Control`-componenten van ee-ads-rhf zetten bovendien "(niet verplicht)" achter elk label. `react-hook-form` is wel geïnstalleerd (ee-ads-rhf heeft het nodig) en komt in gebruik bij het eerste echte formulier.
- Geïnstalleerd (met akkoord): `@amsterdam/ee-ads-rhf` ^0.0.8 en `react-hook-form` ^7.89.
- Het gedrag is gelijk gebleven: een filter zet je terug op pagina 1; een ander thema wist aanleiding, projecten, onderwerpen en tags. De staat zit nog in `ValueProvider` (stap 3 zet hem in de URL).
- Weg: de zes `scaffold*.ts` van `CasesFilter` en `Cases.module.css`. `FilterMenu`, `MultipleOptionsFilterBox` en `NoCorporationFilter` blijven tot het takenoverzicht om is.

Testchecklist zakenoverzicht stap 2 (✅ akkoord):

- [x] De filters staan boven de tabel en breken netjes af op een smaller scherm; de tabel gebruikt de volle breedte.
- [x] Thema, Aanleiding en Items per pagina: elke keuze filtert direct en het aantal in de titel verandert mee.
- [x] Stadsdelen: meerdere kiezen, typen om te zoeken, één verwijderen met het kruisje, alles wissen met het kruisje rechts. De lijst klapt open over de tabel heen en ziet eruit als de andere velden.
- [x] "Alle filters" toont Corporaties, Startdatum en Toon zaken, vóór Sorteren op. In Corporaties: kies een corporatie en daarna "Zonder corporatie" (de corporatie vervalt), en andersom; kies een thema en Projecten/Onderwerpen/Tags verschijnen (als dat thema ze heeft). Wissel van thema: die keuzes worden gewist.
- [x] "Wis alle filters" verschijnt ook na het typen van een zoekterm, zet alle filters terug en maakt het zoekveld leeg; sortering en aantal per pagina blijven.
- [x] Open een zaak en ga terug: de filters staan er nog.
- [x] Het takenoverzicht (nog oud, met de oude filters) werkt nog precies zoals eerst.

Stap 3 (filters in de URL) — omgezet, wacht op test:

- Zoekterm, filters, sortering, pagina en aantal per pagina staan in de URL in plaats van in `ValueProvider`, via `useSearchParams` van React Router (`cases/useCasesFilters.ts`). Alleen wat afwijkt van de standaard staat erin, dus de standaardlijst is gewoon `/zaken`. Voorbeeld: `/zaken?thema=Vakantieverhuur&stadsdeel=Noord&stadsdeel=Centrum&sorteer=straat&pagina=2`.
- Namen en waarden in de URL zijn Nederlands, net als de paden: `zoekterm`, `thema`, `aanleiding`, `stadsdeel`, `project`, `onderwerp`, `tag`, `corporatie`, `zonderCorporatie=ja`, `vanaf` (startdatum), `toon` (`gesloten`/`alle`), `sorteer` (`startdatum`, `gewijzigd`, `straat`, `postcode`, `aanleiding`; met een `-` ervoor voor aflopend), `pagina`, `perPagina`. Een waarde die niet klopt valt terug op de standaard.
- **Nieuw:** een link naar het overzicht kun je delen of als bladwijzer bewaren, en herladen houdt de lijst vast.
- Een filter is geen stap in de geschiedenis (`replace`): "terug" verlaat het overzicht in plaats van filter voor filter terug te lopen.
- **Onthouden per tabblad:** de laatste filters staan ook in `sessionStorage`. Een link naar `/zaken` zonder filters (het menu, de breadcrumb op een zaak) brengt je terug naar die filters, zoals het voorheen ook werkte. "Wis alle filters" maakt ook dat geheugen leeg. Een nieuw tabblad begint met de standaard.
- `ValueProvider` bevat alleen nog de filters van het takenoverzicht; de `cases`-tak (state, reducer, actie) is weg.
- Het startdatumfilter bewaart een datum (`vanaf=2026-09-26`), geen "laatste 7 dagen": een oude link houdt dus die datum. Dat was in het geheugen ook zo.

Testchecklist zakenoverzicht stap 3:

- [ ] Zet een paar filters, een sortering en ga naar pagina 2: de URL verandert mee. Herlaad de pagina: dezelfde lijst.
- [ ] Kopieer de URL naar een nieuw tabblad: dezelfde lijst, met de filters ingevuld (ook de extra filters klappen open als er één aan staat).
- [ ] Open een zaak en ga terug met de terugknop, met de breadcrumb "Zakenoverzicht" en met het menu: steeds dezelfde filters.
- [ ] "Wis alle filters": de URL is weer `/zaken`; ga naar een zaak en terug via het menu: de filters blijven leeg.
- [ ] De terugknop van de browser verlaat het overzicht in één keer (niet filter voor filter).
- [ ] Het takenoverzicht (nog met de oude filters) werkt nog precies zoals eerst en onthoudt zijn filters.

## Fase 3 — Verticale migratie per domein (± 4–8 weken)

Per pagina/feature in één PR: styled-components → CSS Modules, asc-ui → ADS, wonen-ui → eigen/ADS-componenten, final-form → react-hook-form.

> **🧪 Pilots: eerst één voorbeeld per soort wijziging**
>
> Deze fase raakt de hele UI. Daarom komt er eerst een apart voorbeeld per soort wijziging, dat getest en goedgekeurd wordt voordat dat soort wijziging verder wordt uitgerold:
>
> | Soort wijziging                         | Voorbeeld (pilot)                                        | Wat testen                                                 |
> | --------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
> | Volledige pagina naar ADS + CSS Modules | `help/HelpPage` of `errors/NotFoundPage`                 | Uiterlijk vs. huidige versie, responsive, toegankelijkheid |
> | Layout (header/navigatie/footer)        | `DefaultLayout` op de gemigreerde pilotpagina            | Navigatie, gebruikersmenu, mobiel menu, skip-links         |
> | Formulier naar react-hook-form          | één eenvoudig formulier, bijv. `ChangeDueDateForm`       | Validatie, foutmeldingen, submit-payload identiek aan nu   |
> | Filters                                 | `CasesFilter` (alleen cases-overzicht)                   | Filteren, paginering, sortering, bewaren van filterwaarden |
> | wonen-ui vervanging                     | `DefinitionList` → `DescriptionList` op één detailpagina | Weergave van lege/ontbrekende waarden, datums              |
> | Dynamisch workflowformulier             | één workflow-taaktype via `DynamicField`                 | Alle veldtypes, payload naar Camunda identiek aan nu       |
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

| asc-ui                                                            | ADS (`@amsterdam/design-system-react`)                                 |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `Heading`, `Paragraph`, `Typography`                              | `Heading`, `Paragraph`                                                 |
| `Button`, `MenuButton`                                            | `Button` (`variant="primary\|secondary\|tertiary"`)                    |
| `Link`                                                            | `Link` (+ `react-router` `Link` via `as`/wrapper)                      |
| `Alert`                                                           | `Alert`                                                                |
| `Spinner`                                                         | eigen `AmsterdamCrossSpinner` (uit top-frontend-v2)                    |
| `Label`, `ErrorMessage`                                           | `Label`, `ErrorMessage` (via ee-ads-rhf automatisch)                   |
| `Checkbox`, `Radio`, `RadioGroup`, `Select`, `TextArea`, `Switch` | ee-ads-rhf `*Control` componenten                                      |
| `SearchBar`                                                       | `SearchField`                                                          |
| `Modal`, `AscModal`                                               | `Dialog`                                                               |
| `Accordion`                                                       | `Accordion`                                                            |
| `Breadcrumbs`                                                     | `Breadcrumb`                                                           |
| `Card`, `CardContent`                                             | `Card` of eigen `Card` (top-frontend-v2)                               |
| `List`, `ListItem`                                                | `UnorderedList`, `OrderedList`                                         |
| `Divider`                                                         | eigen `Divider` (top-frontend-v2) of CSS border                        |
| `Header`, `TopBar`, `MenuInline`, `MenuToggle`, `MenuItem`        | `PageHeader` + `Menu`                                                  |
| `Icon` + `@amsterdam/asc-assets`                                  | `Icon` + `@amsterdam/design-system-react-icons`                        |
| `FormTitle`                                                       | `Heading level={…}`                                                    |
| `themeSpacing(n)`, `themeColor(…)`, `breakpoint(…)`               | CSS vars `--ams-space-*`, `--ams-color-*`; media queries in CSS Module |
| `useFocusWithArrows`                                              | eigen kleine hook of ADS-gedrag                                        |

### Componentmapping: wonen-ui → nieuw

| wonen-ui                                                                     | Vervanging                                                                               |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `DefinitionList`                                                             | ADS `DescriptionList`                                                                    |
| `Table`, `LoadingRows`, `SmallSkeleton`                                      | eigen `Table` (top-frontend-v2) + `CardSkeletons`                                        |
| `DateDisplay`, `Date`                                                        | `shared/dateFormatters.ts` (dayjs)                                                       |
| `CaseIdDisplay`                                                              | kleine eigen component/formatter                                                         |
| `PersonNameDisplay`, `PersonRoleDisplay`, `PersonEntityDisplay`, `Residents` | eigen componenten in `src/components/persons/` (top-frontend-v2 heeft `residents`-hooks) |
| `PermitsOverview`, `PermitsSynopsis`, `HolidayRentalRegistration(s)`         | eigen componenten in `src/components/permits/`                                           |
| `EventsTimeline`                                                             | `CaseEventTimeline` (top-frontend-v2)                                                    |
| `List`                                                                       | ADS `UnorderedList`                                                                      |

### Formulieren: final-form → react-hook-form + ee-ads-rhf

| amsterdam-react-final-form          | Nieuw                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `ScaffoldForm` + `scaffold.ts`      | `useForm()` + `<FormProvider form={form}>` + expliciete JSX-velden           |
| `FormPositioner` (25×)              | ADS `Grid` / `Column` / `Row`                                                |
| `ScaffoldField` type `TextField`    | `TextInputControl`                                                           |
| `TextAreaField`                     | `TextAreaControl`                                                            |
| `DateField`                         | `DateControl`                                                                |
| `ComplexSelectField`, `SelectField` | `SelectControl` / `ReactSelectControl`                                       |
| `CheckboxFields`, `Boolean`         | `CheckboxControlGroup`, `CheckboxControl`                                    |
| `RadioFields`                       | `RadioControl`                                                               |
| `ShowHide` (+ immer)                | `useWatch` + conditionele render                                             |
| `AutoFillButton`                    | `form.setValue(...)`                                                         |
| `ConfirmScaffoldForm`               | `ConfirmDialog` + `handleSubmit`                                             |
| final-form validators               | `rules` per control (of zod-schema, alleen na akkoord over extra dependency) |
| foutoverzicht                       | `InvalidFormAlert` + `mapErrorsToAlert`                                      |

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

- [ ] Dependencies verwijderen: `@amsterdam/asc-ui`, `@amsterdam/asc-assets`, `@amsterdam/wonen-ui`, `@amsterdam/amsterdam-react-final-form`, `final-form`, `final-form-arrays`, `react-final-form`, `react-final-form-arrays`, `styled-components`, `@types/styled-components`, `lodash` (tijdelijk toegevoegd in Fase 0), `immer`, `react-router-dom`. (`axios`, `qs`, `lodash.merge` en `lodash.isempty` zijn al weg in Fase 1c.) Controleer `react-tooltip` (alleen in `CustomTooltip`; ADS-alternatief of native `title`/popover).
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

| #   | Fase                          | Status      | Afhankelijk van | Pilot (eerst testen + akkoord)                 | Indicatie | Zichtbaar voor gebruiker? |
| --- | ----------------------------- | ----------- | --------------- | ---------------------------------------------- | --------- | ------------------------- |
| 0   | Tooling & voorbereiding       | ✅          | –               | –                                              | 1–2 dagen | Nee                       |
| 1   | TanStack Query                | ✅          | 0               | `themes` + één mutatie (`feedback`)            | 1–2 weken | Nee (alleen sneller)      |
| 2   | ADS-fundament                 | ⏭️ volgende | 0               | één gedeeld component op één pagina            | 1 week    | Beperkt (layout)          |
| 3   | Verticale migratie per domein | –           | 1, 2            | één voorbeeld per soort wijziging (zie Fase 3) | 4–8 weken | Ja                        |
| 4   | Routing                       | –           | 0               | één routegroep                                 | 2–3 dagen | Nee                       |
| 5   | React 19 + opruimen           | –           | 3 (volledig)    | upgrade-branch eerst alleen op acceptatie      | 2–3 dagen | Nee                       |

De indicaties gaan over bouwtijd. Reken per pilot op extra doorlooptijd voor test en akkoord.

Fase 1 en 2 kunnen parallel lopen als er twee mensen aan werken.

## 5. Risico's en aandachtspunten

- **Dynamische workflowformulieren** (Camunda) zijn het meest complexe stuk. Eerst tests op de huidige mapping schrijven, dan migreren.
- **Twee designsystemen tegelijk** geeft tijdelijk visuele inconsistentie. Minimaliseer dit door per volledige pagina te migreren en de layout vroeg om te zetten.
- **Cache-invalidatie**: de huidige `clearCache()` leegt een hele `ApiGroup` na elke mutatie. Neem dat gedrag in eerste instantie 1-op-1 over (`invalidateQueries` op de groep-key) en optimaliseer pas later, om regressies te voorkomen.
- **Bundle-grootte** groeit tijdelijk (beide libraries geladen). Dat is acceptabel zolang de migratie loopt.
- **`ee-ads-rhf` is v0.0.x**: API kan nog wijzigen. Pin de versie en kijk hoe top-frontend-v2 ermee omgaat.
- **Geen nieuwe dependencies** zonder overleg (zelfde regel als top-frontend-v2). `react-hook-form` is een verplichte peer van `ee-ads-rhf` en hoort er dus bij.
