import type { components as Components, operations as Operations, paths as Paths } from "__generated__/apiSchema";

declare global {
  type components = Components;
  type operations = Operations;
  type paths = Paths;
}

export {};
