import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeTonApiUrl } from "@/api/utils/makeApiUrl"

export const useListing = (tonId?: string) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.listings.detail(tonId),
    queryFn: () => fetch<TON.Schemas.Listing>(makeTonApiUrl("listings", tonId)),
    enabled: tonId !== undefined,
  })
}
