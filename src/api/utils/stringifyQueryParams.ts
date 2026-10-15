type QueryParamValue = string | number | boolean | null | undefined

/**
 * Builds a query string, skipping undefined/null values (and empty strings
 * inside arrays). Returns "" when there are no params, so it can always be
 * appended to a url.
 */
export const stringifyQueryParams = (
  params: Record<string, QueryParamValue | QueryParamValue[]>,
) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== "") {
          searchParams.append(key, String(v))
        }
      })
    } else {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ""
}

/** Leaves an empty filter list out of the query. */
export const nonEmpty = <T>(values?: T[]) =>
  values?.length ? values : undefined
