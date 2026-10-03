type ThemeId = components["schemas"]["CaseTheme"]["id"]
type BagId = components["schemas"]["Address"]["bag_id"]
type CaseId = components["schemas"]["CaseDetail"]["id"]

/**
 * Hierarchical query key factory, one entry per resource exposed by src/api/hooks/*.
 *
 * Keys are structured so that invalidating a parent key (e.g. queryKeys.cases.detail(id))
 * also invalidates every child key (its workflows, events, schedules, ...). The first part
 * is the group the request belonged to before the migration to TanStack Query.
 *
 * Mutations invalidate or update as little as possible: only what shows the changed data
 * (see the comments on the mutation hooks).
 */
export const queryKeys = {
  addresses: {
    all: ["addresses"] as const,
    detail: (bagId: BagId) => ["addresses", bagId] as const,
    permits: (bagId: BagId) => ["addresses", bagId, "permits"] as const,
    permitsPowerBrowser: (bagId: BagId) =>
      ["addresses", bagId, "permits-powerbrowser"] as const,
    meldingen: (bagId: BagId, startDate: string) =>
      ["addresses", bagId, "meldingen", { startDate }] as const,
    registrations: (bagId: BagId) =>
      ["addresses", bagId, "registrations"] as const,
    residents: (bagId: BagId) => ["addresses", bagId, "residents"] as const,
    districts: () => ["addresses", "districts"] as const,
  },

  auth: {
    all: ["auth"] as const,
    me: () => ["auth", "users", "me"] as const,
  },

  cases: {
    all: ["cases"] as const,
    detail: (caseId?: CaseId) => ["cases", caseId] as const,
    workflows: (caseId: CaseId) => ["cases", caseId, "workflows"] as const,
    events: (caseId: CaseId) => ["cases", caseId, "events"] as const,
    schedules: (caseId: CaseId) => ["cases", caseId, "schedules"] as const,
    summons: (caseId?: CaseId) => ["cases", caseId, "summons"] as const,
    processes: (caseId: CaseId) => ["cases", caseId, "processes"] as const,
    closeReasons: (themeId?: ThemeId) =>
      ["cases", "themes", themeId, "case-close-reasons"] as const,
    closeResults: (themeId?: ThemeId) =>
      ["cases", "themes", themeId, "case-close-results"] as const,
    // The case lists: the overview, and the cases of an address.
    listAll: ["cases", "list"] as const,
    list: (params: Record<string, unknown>) =>
      ["cases", "list", params] as const,
    byAddressAll: ["cases", "byAddress"] as const,
    byAddress: (bagId: BagId, openCases?: boolean) =>
      ["cases", "byAddress", bagId, { openCases }] as const,
    // The task lists of the overview.
    tasksAll: ["cases", "tasks"] as const,
    tasks: (params: Record<string, unknown>) =>
      ["cases", "tasks", params] as const,
    decisionTypes: (themeId?: ThemeId) =>
      ["cases", "themes", themeId, "decision-types"] as const,
    quickDecisionTypes: (themeId?: ThemeId) =>
      ["cases", "themes", themeId, "quick-decision-types"] as const,
    scheduleTypes: (themeId?: ThemeId) =>
      ["cases", "themes", themeId, "schedule-types"] as const,
    violationTypes: (themeId?: ThemeId) =>
      ["cases", "themes", themeId, "violation-types"] as const,
  },

  dataPunt: {
    all: ["dataPunt"] as const,
    bagPdokSuggest: (searchString?: string) =>
      ["dataPunt", "pdok", "suggest", searchString] as const,
    bagPdokFree: (searchString?: string) =>
      ["dataPunt", "pdok", "free", searchString] as const,
    benkAgg: (bagId?: BagId) => ["dataPunt", "benkagg", bagId] as const,
    panorama: (params: Record<string, number | undefined>) =>
      ["dataPunt", "panorama", params] as const,
  },

  fines: {
    all: ["fines"] as const,
    detail: (id?: string) => ["fines", id] as const,
  },

  housingCorporations: {
    all: ["housingCorporations"] as const,
    list: () => ["housingCorporations", "list"] as const,
  },

  listings: {
    all: ["listings"] as const,
    detail: (tonId?: string) => ["listings", tonId] as const,
  },

  roles: {
    all: ["roles"] as const,
  },

  task: {
    all: ["task"] as const,
    summonTypes: (taskId: Tasks.TaskId) =>
      ["task", taskId, "summon-types"] as const,
  },

  themes: {
    all: ["themes"] as const,
    list: () => ["themes", "list"] as const,
    reasons: (themeId?: ThemeId) => ["themes", themeId, "reasons"] as const,
    projects: (themeId?: ThemeId) =>
      ["themes", themeId, "case-projects"] as const,
    subjects: (themeId?: ThemeId) => ["themes", themeId, "subjects"] as const,
    tags: (themeId?: ThemeId) => ["themes", themeId, "tags"] as const,
    taskReasonNames: (themeName?: string) =>
      ["themes", "tasks", "reason-names", { themeName }] as const,
    taskNames: (themeName: string | null, role: string | null) =>
      ["themes", "tasks", "task-names", { themeName, role }] as const,
    taskOwners: () => ["themes", "tasks", "owners"] as const,
  },

  users: {
    all: ["users"] as const,
    list: () => ["users", "list"] as const,
  },
} as const
