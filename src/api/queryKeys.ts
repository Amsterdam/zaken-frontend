/**
 * Hierarchical query key factory, one entry per resource exposed by src/api/hooks/*.
 *
 * Keys are structured so that invalidating a parent key (e.g. queryKeys.themes.all)
 * also invalidates every child key, replacing the old clearCache() per ApiGroup
 * with TanStack Query's built-in key-prefix matching.
 */
export const queryKeys = {
  themes: {
    all: ["themes"] as const,
    list: () => ["themes", "list"] as const,
  },
} as const
