type ThemeId = components["schemas"]["CaseTheme"]["id"]
type BagId = components["schemas"]["Address"]["bag_id"]
type CaseId = components["schemas"]["CaseDetail"]["id"]

/**
 * Hierarchical query key factory, one entry per resource exposed by src/api/hooks/*.
 *
 * The first part of every key is the ApiGroup the hook had in the old
 * app/state/rest layer. A mutation there cleared its whole group; here that
 * is invalidateQueries({ queryKey: queryKeys.<group>.all }), so the
 * invalidation behavior stays exactly the same.
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
    isAuthorized: () => ["auth", "is-authorized"] as const,
  },

  cases: {
    all: ["cases"] as const,
    detail: (caseId?: CaseId) => ["cases", caseId] as const,
    workflows: (caseId: CaseId) => ["cases", caseId, "workflows"] as const,
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
