// @ts-expect-error -- window.env wordt runtime gezet via public/config/env.js
export const env = { ...import.meta.env, ...window["env"] };
