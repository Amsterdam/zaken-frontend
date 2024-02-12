/**
  * Glues all given parts together with exactly one /.
  * E.g. ['foo', '/zoo/bar/', '/moo'] will become: '/foo/zoo/bar/moo/'
  *
  * When called with trailingSlash=false, the string will become: '/foo/zoo/bar/moo'
  * When called with leadingSlash=false, the string will become: 'foo/zoo/bar/moo/'
  */
export const slashSandwich = (
  parts: Array<string | number | undefined>,
  { leadingSlash = true, trailingSlash = true } = {}
): string => {
  let sandwich = stripDoubleSlashes(`/${ parts.filter(_ => _ !== null || _ !== undefined).join("/") }/`)
  if (!leadingSlash || sandwich.match(/^\/https?:\/\//)) {
    sandwich = stripLeadingSlash(sandwich)
  }
  if (!trailingSlash) {
    sandwich = stripTrailingSlash(sandwich)
  }
  return sandwich
}

/**
  * Strips all double slashes from a string. Except the one following a :/.
  * E.g. 'foo//bar' wil become 'foo/bar'. 'https://www.domain.com//foo' will become: 'https://www.domain.com//foo'
  */
export const stripDoubleSlashes = (path: string): string =>
  path.replace(/^\/+/, "/").replace(/([^:]\/)\/+/g, "$1")

/* *
   * Strips the trailing slash from a string (when it exists).
   * E.g. '/foo/bar/' becomes '/foo/bar', 'foo' will stay 'foo'
   */
export const stripTrailingSlash = (path: string): string =>
  path.replace(/\/$/, "")

/**
  * Strips the leading slash from a string (when it exists).
  * E.g. '/foo/bar/' becomes 'foo/bar/', 'foo' will stay 'foo'
  */
export const stripLeadingSlash = (path: string): string =>
  path.replace(/^\//, "")

export default slashSandwich
