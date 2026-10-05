import { useSearchParams } from "react-router"
import { useBagPdok } from "@/api/hooks"

// The name in the URL is Dutch, like the paths and the overviews.
export const SEARCH_PARAM = "zoekterm"
export const MIN_SEARCH_LENGTH = 3

/**
 * The addresses found for the search term in the URL. Nothing is searched
 * while the term is too short.
 */
export const useAddressSearch = () => {
  const [searchParams] = useSearchParams()
  const searchString = searchParams.get(SEARCH_PARAM) ?? ""
  const isValid = searchString.length >= MIN_SEARCH_LENGTH
  const { data, isLoading, isError } = useBagPdok(
    isValid ? searchString : undefined,
    // The page says that the search failed.
    { globalErrorToast: false },
  )

  return { searchString, isValid, data, isLoading, isError }
}

export default useAddressSearch
