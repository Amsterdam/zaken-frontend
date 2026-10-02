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

#### Status pilot: ✅ akkoord (okt 2026)

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

#### Status uitrol

Principe: **per oude `ApiGroup` volledig migreren** (alle queries én mutaties van een groep tegelijk). Elke query-key begint met de groepsnaam, en een mutatie invalideert `queryKeys.<groep>.all`. Omdat de oude `clearCache()` alleen de eigen groep leegmaakte, blijft het invalidatiegedrag 1-op-1 gelijk en is er tijdens de overgang geen brug tussen oude en nieuwe cache nodig.

| Groep | Status | Hooks |
| --- | --- | --- |
| `themes` | ✅ | `useCaseThemes`, `useReasons`, `useProjects`, `useSubjects`, `useTags`, `useTasksReasons`, `useTaskNames`, `useTaskOwners` |
| `auth` | ✅ | `useUsersMe`, `useIsAuthorized` |
| `users` | ✅ | `useUsers` |
| `roles` | ✅ | `useRoles` (nog steeds mockdata, er is geen endpoint) |
| `fines`, `listings`, `housingCorporations` | ✅ | `useFine`, `useListing`, `useCorporations` |
| `addresses` | ✅ | `useAddress` + `useUpdateAddress`, `usePermitDetails`, `usePermitsPowerBrowser`, `useMeldingen`, `useRegistrations`, `useResidents`, `useDistricts` |
| `dataPunt` | ✅ | `useBagPdok`, `useBagPdokByBagId`, `useBenkAgg`, `usePanorama` |
| `supportContacts`, `permissions` | ✅ verwijderd | `useSupportContacts`, `usePermissions` (`/permissions/`) werden nergens gebruikt |
| `cases`, `case`, `task` | ⏳ eerst pilot | zie hieronder. De opzoeklijsten `useDecisionTypes`, `useQuickDecisionTypes`, `useScheduleTypes` en `useViolationTypes` zijn al over, met keys onder `cases` |

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
> - **Cache direct aanpassen:** `updateCache` (`ChangeHousingCorporation`) en `useContextCache` (`SelectTask`, `AssignTask`, `Workflow/columns`, `Tasks`) → `queryClient.setQueryData` / `invalidateQueries`.
> - **Polling:** `usePollingRefetch` in `Workflow` → `refetchInterval`.
> - **Paginering, sortering en filters:** `useCases`, `useTasks` → `placeholderData: keepPreviousData`.
>
> Voorstel voor het voorbeeld: `useCase` + `useCaseWorkflows` met polling op de zaakdetailpagina, plus de `updateCache` in `ChangeHousingCorporation`. Na akkoord volgen het takenoverzicht (`useContextCache`) en de overige formulieren.

#### Status pilot `cases`: ✅ akkoord (okt 2026)

De `cases`-groep (32 hooks) gaat in delen over. Daarom is er een **tijdelijke brug tussen oude en nieuwe cache**, te verwijderen samen met de oude laag (1c):
- `useApiRequest`: een oude mutatie invalideert ook de TanStack-queries van haar groep, **pas nadat het verzoek klaar is**. Eerst gebeurde dat in `ApiProvider` bij `clearCache()`, maar de oude laag roept die vóór het verzoek aan. Oude GET's wachten via de request-queue netjes tot de mutatie klaar is, TanStack niet: die haalde de oude stand op terwijl de POST nog liep (gevonden bij het testen: na taak afronden bleef de oude taak staan). Getest in `useApiRequest.test.tsx`.
- `src/api/legacyCacheBridge.ts`: nieuwe mutaties kunnen gericht items in de oude cache bijwerken (`useUpdateLegacyCacheItem`) of als verouderd markeren op URL-prefix (`useInvalidateLegacyCacheItems`), in plaats van de hele groep te legen.

| Oud | Nieuw |
| --- | --- |
| `useCase` (16 plekken) | `useCase(caseId)`; uitgeschakeld zolang `caseId` ontbreekt |
| `useCase().execPatch` (`ChangeTagForm`, `ChangeableSubject`) | `useUpdateCase(caseId)` → werkt de caches bij zonder refetch (zie hieronder) |
| `useCase().updateCache` (`ChangeHousingCorporation`) | `useSetCaseData(caseId)` → `queryClient.setQueryData` |
| `useExistingCase`: `lazy` + `execGet` in een `useEffect` + `errors` | `useCase(valid ? id : undefined)` + `error.status === 404` |
| `useCaseWorkflows` + `usePollingRefetch` | `useCaseWorkflows(caseId, { pollWhileEmpty })` met `refetchInterval`: 1, 2, 4, 8, 16 s, max. 5 pogingen, geteld vanaf mount; geeft `isPolling` terug. Ook mislukte pogingen tellen mee (anders bleef een falend endpoint eeuwig gepold; gevonden bij nalopen, met test). Verschil: "Herlaad taken." telt nu als poging. `usePollingRefetch` is verwijderd. |
| `useContextCache` op de workflows (`Workflow/columns`) | `useSetWorkflowTaskOwner(caseId)` → `setQueryData` |

Verschil voor gebruikers: na een wijziging (tag, onderwerp, taak afronden) toonde de zaakpagina kort een volledig laadscherm, omdat de oude cache de data weggooide tijdens het verversen. Nu blijft de pagina staan en ververst hij op de achtergrond.

> **⚠️ Gevonden bij het testen: modals die "vanzelf" sloten.** Vijf modals op de zaakpagina sloten na opslaan niet zelf. Ze verdwenen alleen omdat het oude laadscherm de hele pagina (en dus de modal) opnieuw opbouwde. Nu de pagina blijft staan, bleven ze open. Opgelost door de modal te sluiten zodra het verzoek klaar is, ook bij een fout (die verschijnt als flash message, zoals voorheen):
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
- [ ] Zaak openen: gegevens, kop, adres en paginatitel laden. Een niet-bestaand id (`/zaken/999999999`) toont "niet gevonden".
- [ ] Gevoelige zaak zonder recht → "niet geautoriseerd", zoals nu.
- [ ] Tag wijzigen en onderwerp wijzigen: de nieuwe waarde verschijnt, tijdlijn/events verversen ook. _(Tag: de modal bleef open, opgelost.)_
- [ ] Woningcorporatie wijzigen: de nieuwe corporatie staat direct op de zaak.
- [ ] Taak afronden: de takenlijst ververst en toont de volgende taak. Network: eerst de POST op `generic-tasks/complete/`, daarna pas `workflows/` en `events/`; geen `cases/:id/`. _(Gevonden: de GET's liepen vóór de POST, opgelost.)_
- [ ] Een oude mutatie, bijv. een besluit of debrief opslaan: terug op de zaak staan de nieuwe gegevens (niet de stand van vóór het opslaan).
- [ ] Nieuwe zaak aanmaken en direct openen: de takenlijst toont kort laadregels en vult zich binnen enkele seconden (polling). Network-tab: herhaalde `/workflows/`-requests met oplopende tussenpozen, die stoppen zodra er taken zijn.
- [ ] Afgesloten zaak zonder taken: geen polling, wel de tekst "Deze zaak is afgesloten…" en "Herlaad taken." werkt.
- [ ] Taak toewijzen vanuit de takenlijst op de zaak: de nieuwe behandelaar verschijnt direct.
- [ ] Blokkeer `*/workflows/*` en open een zaak (ook als al de eerste fetch faalt): géén rode melding, de takenlijst blijft laadregels tonen terwijl er gepold wordt (requests na ±1, 3, 7, 15 en 31 s), daarna niets meer en "Geen taken beschikbaar." met "Herlaad taken.". Een afgesloten zaak toont direct "Deze zaak is afgesloten…" zonder te pollen.
- [ ] Na opslaan sluit de modal bij: tag, onderwerp, woningcorporatie, deadline van een taak, planning van een bezoek, taak afronden.
- [ ] Deadline wijzigen: na de PATCH alleen een request naar `cases/:id/workflows/` (niet naar de zaak, events of schedules). Daarna naar het takenoverzicht: dat toont de nieuwe deadline.
- [ ] Tag en onderwerp wijzigen: na de PATCH géén andere requests. De nieuwe tag/onderwerpen staan direct op de zaak, de onderwerpen ook in het zaak-event in de tijdlijn. Daarna in het zakenoverzicht filteren op die tag: de zaak staat erbij.
- [ ] Planning wijzigen: na de PATCH géén andere requests. De urgentie in de takenlijst én het planning-event in de tijdlijn tonen toch direct de nieuwe waarde, en na herladen van de pagina nog steeds.

#### Takenoverzicht: ✅ akkoord (okt 2026)

| Oud | Nieuw |
| --- | --- |
| `useTasks` (+ `getQueryUrl`) in de oude `cases`-groep | `useTasks(params)` met key `["cases", "tasks", params]` en `placeholderData: keepPreviousData`: bij een andere pagina, sortering of filter blijft de vorige lijst staan tot de nieuwe binnen is |
| Resultaten en aantal via `updateContextTasks` in `ValueProvider` | Direct uit de query. De filters staan nog wel in `ValueProvider` (zie 1c) |
| Filter wijzigen → `clearContextCache()` leegde de hele oude `cases`-groep | Niets nodig: een andere filter is een andere query-key |
| Toewijzen: `useTask().execPatch` + `useContextCache` met een nagebouwde lijst-URL, of `onOwnerChange` op de zaakpagina | `useAssignTask(taskId)`: werkt de eigenaar bij in álle gecachte takenlijsten én workflows, zonder refetch. `AssignTask` heeft geen `isEnforcement`/`onOwnerChange` meer nodig; `useSetWorkflowTaskOwner` is vervallen |
| `SelectTask` + `UserIcon` | Verwijderd: werden nergens gebruikt |

Let op: de taak-id is in de workflows een string (`case_user_task_id`, `CharField(source="id")`) en in de takenlijst een getal (`id`); `useAssignTask` vergelijkt daarom als string.

Andere mutaties (deadline, taak afronden, tag/onderwerp) markeren de takenlijsten nu via TanStack als verouderd (`queryKeys.cases.tasksAll`); ze laden pas bij het volgende bezoek aan het overzicht.

Testchecklist:
- [ ] Takenoverzicht laden; aantallen kloppen; de handhavingsverzoeken staan bovenaan als die er zijn.
- [ ] Bladeren, sorteren (o.a. slotdatum, straat) en paginagrootte wijzigen: de tabel toont laden en daarna de juiste taken.
- [ ] Alle filters (thema, rol, taaknaam, behandelaar, aanleiding, project, onderwerp, tag, stadsdeel, corporatie) geven de juiste taken; bij een filterwijziging wordt alleen `tasks/?…` opgehaald.
- [ ] Taak aan jezelf, aan iemand anders en aan niemand toewijzen (ook herverdelen met bevestiging): de eigenaar verandert direct, zonder extra requests na de PATCH. Ook in de tabel met handhavingsverzoeken.
- [ ] Taak toewijzen op de zaakpagina: idem.
- [ ] Taak toewijzen in het overzicht, dan de zaak openen (binnen 5 minuten): de takenlijst op de zaak toont de nieuwe behandelaar.
- [ ] Deadline wijzigen of taak afronden op een zaak, dan terug naar het overzicht: de nieuwe stand wordt opgehaald.

#### Zakenoverzicht en zaken per adres: ✅ akkoord (okt 2026)

| Oud | Nieuw |
| --- | --- |
| `useCases(14 losse argumenten)` | `useCases({ ... })` met key `["cases", "list", params]` en `placeholderData: keepPreviousData`. Lege strings en lijsten blijven uit de query, zoals de oude `cleanParamObject` deed (getest: zelfde query string) |
| Resultaten en aantal via `updateContextCases` in `ValueProvider` | Direct uit de query; de filters staan nog in `ValueProvider` (zie 1c) |
| `useCasesByBagId` (adrespagina: zaken, advertenties, adresmenu; zaak aanmaken) | `useCasesByBagId(bagId, openCases?)` met key `["cases", "byAddress", bagId, { openCases }]` |

`app/state/rest/cases.ts` is verwijderd. Mutaties die zaak- of takenlijsten raken (tag/onderwerp, taak afronden) markeren nu alle lijsten via `invalidateCaseAndTaskLists` als verouderd; ze laden pas als ze weer getoond worden. Oude mutaties in de `cases`-groep (zaak aanmaken, besluiten, …) invalideren ze via de brug in `useApiRequest`, zoals voorheen.

Testchecklist:
- [ ] Zakenoverzicht laden; het aantal klopt.
- [ ] Bladeren, sorteren (straat, postcode, aanleiding, startdatum, laatst gewijzigd) en paginagrootte wijzigen.
- [ ] Alle filters (thema, aanleiding, project, onderwerp, tag, stadsdeel, corporatie, open/gesloten, startdatum) en de zoekbalk op adres. Een leeg gemaakt filter verdwijnt uit de query (Network: geen `theme_name=` zonder waarde).
- [ ] Gevoelige zaken alleen met het recht daarvoor; zonder recht bij Ondermijning de juiste lege tekst.
- [ ] Adrespagina: de zaken op het adres, de advertenties en het adresmenu (aantal zaken).
- [ ] Zaak aanmaken op een adres met bestaande zaken: de melding over bestaande zaken klopt. Na het aanmaken toont de adrespagina de nieuwe zaak.
- [ ] Tag wijzigen op een zaak, dan in het zakenoverzicht op die tag filteren: de zaak staat erbij.

#### Zaakformulieren en overige `cases`-hooks: gebouwd, wacht op test

**Alle hooks uit `app/state/rest` zijn nu over.** Geen component gebruikt de oude laag nog; alleen `ApiProvider` hangt nog in `App.tsx` (weg in 1c).

| Oud | Nieuw |
| --- | --- |
| `useDebriefingCreate`, `useSummons`, `useDecisions`, `useQuickDecisions`, `useCaseClose`, `useCitizenReports`, `useVisitsCreate`, `useScheduleCreate`, `useWorkflowProcess` | `useCreateDebriefing`, `useCreateSummon`, `useCreateDecision`, `useCreateQuickDecision`, `useCloseCase`, `useCreateCitizenReport`, `useCreateVisit`, `useCreateSchedule`, `useStartWorkflowProcess`, allemaal via `useCaseFormMutation(caseId, url)` |
| `useCaseCreate` | `useCreateCase` |
| `useCaseEvents`, `useSchedulesByCaseId`, `useSummonsWithCaseId`, `useCaseCloseReasons`/`Results`, `useWorkflowProcesses`, `useSummonTypesByTaskId` | Dezelfde namen in `src/api/hooks` (`useSummonsWithCaseId` → `useSummonsByCaseId`) |
| `useCorrespondence(s)`, `useCaseVisits` | Verwijderd: werden nergens gebruikt |

- **Na opslaan van een formulier** wordt alles van die zaak (`["cases", caseId, …]`) plus de zaak- en takenlijsten als verouderd gemarkeerd, **zonder** direct op te halen (`refetchType: "none"`). Op het formulier zelf gaat er dus niets extra's uit; terug op de zaakpagina laadt precies wat daar getoond wordt één keer. De oude laag leegde de hele groep en haalde ook alles op wat op het formulier zichtbaar was.
- **`toPostMethod`** (`src/api/utils/toPostMethod.ts`) koppelt een mutatie aan het `postMethod`-contract van de oude formulieren (`{ data }` bij succes, `undefined` bij een fout). Weg in Fase 3.
- **Afsluitformulier:** de oude `useCaseClose()` stond niet op `lazy` en deed bij openen een GET op `case-close/` (alle afsluitingen). Die is weg.
- Events en schedules staan nu in TanStack, dus de tijdelijke koppelingen naar de oude cache (planning, tag/onderwerp, taak afronden) zijn gewone `setQueryData`/`invalidateQueries` geworden. `legacyCacheBridge.ts` is verwijderd.

Testchecklist (per formulier: invullen, bevestigen, terug op de zaak):
- [ ] Debrief, besluit, snel besluit, dagvaarding (dagvaardingstypes per taak gevuld), bezoek, melding, planning aanmaken, zaak afsluiten (redenen en resultaten gevuld), taak opvoeren (processen gevuld).
- [ ] Na elk formulier: terug op de zaak staat de nieuwe stand (takenlijst, tijdlijn, en bij afsluiten "Deze zaak is afgesloten…"). Network: op het formulier na de POST geen extra GET's; op de zaakpagina één keer de gegevens van de zaak.
- [ ] Een formulier dat op de server faalt: foutmelding, je blijft op het formulier.
- [ ] Besluitformulier: de lijst met dagvaardingen bovenaan laadt.
- [ ] Zaak aanmaken: na opslaan naar de nieuwe zaak; het zakenoverzicht en de adrespagina tonen hem.
- [ ] Afsluitformulier openen: géén GET op `case-close/` meer.
- [ ] Tijdlijn en overlastmelding (`CaseNuisanceAlert`) op de zaakpagina tonen de events.

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
