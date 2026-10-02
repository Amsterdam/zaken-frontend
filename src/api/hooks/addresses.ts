import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { stringifyQueryParams } from "@/api/utils/stringifyQueryParams"
import { makeApiUrl } from "@/api/utils/makeApiUrl"

type Address = components["schemas"]["Address"]
type BagId = Address["bag_id"]

export const useAddress = (bagId: BagId, options?: { enabled?: boolean }) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.addresses.detail(bagId),
    queryFn: () => fetch<Address>(makeApiUrl("addresses", bagId)),
    enabled: options?.enabled ?? true,
  })
}

export const useUpdateAddress = (bagId: BagId) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Address>) =>
      fetch<Address>(makeApiUrl("addresses", bagId), { method: "PATCH", data }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all }),
  })
}

export const usePermitDetails = (bagId: BagId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.addresses.permits(bagId),
    queryFn: () =>
      fetch<components["schemas"]["Decos"]>(
        makeApiUrl("addresses", bagId, "permits"),
      ),
    meta: { globalErrorToast: false },
  })
}

export const usePermitsPowerBrowser = (bagId: BagId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.addresses.permitsPowerBrowser(bagId),
    queryFn: () =>
      fetch<components["schemas"]["Powerbrowser"][]>(
        makeApiUrl("addresses", bagId, "permits-powerbrowser"),
      ),
    meta: { globalErrorToast: false },
  })
}

export const useMeldingen = (bagId: BagId) => {
  const fetch = useApiFetch()
  const startDate = dayjs().subtract(1, "years").startOf("year").format()
  const queryString = stringifyQueryParams({ start_date: startDate })

  return useQuery({
    queryKey: queryKeys.addresses.meldingen(bagId, startDate),
    queryFn: () =>
      fetch<components["schemas"]["Meldingen"]>(
        `${makeApiUrl("addresses", bagId, "meldingen")}${queryString}`,
      ),
    meta: { globalErrorToast: false },
  })
}

export const useRegistrations = (bagId: BagId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.addresses.registrations(bagId),
    queryFn: () =>
      fetch<components["schemas"]["RegistrationDetails"]>(
        makeApiUrl("addresses", bagId, "registrations"),
      ),
    meta: { globalErrorToast: false },
  })
}

export const useResidents = (bagId: BagId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.addresses.residents(bagId),
    queryFn: () =>
      fetch<components["schemas"]["Brp"]>(
        makeApiUrl("addresses", bagId, "residents"),
      ),
  })
}

export const useDistricts = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.addresses.districts(),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedDistrictList"]>(
        makeApiUrl("addresses", "districts"),
      ),
  })
}
