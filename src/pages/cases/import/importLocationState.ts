import type { ImportCaseData } from "@/api/hooks"

/**
 * What a step of importing cases passes on to the next one (and back), in the
 * state of the route: the data for all cases and, from step 2, the file and
 * the number of addresses in it that can get a case.
 */
export type ImportLocationState = {
  caseData: ImportCaseData
  file?: File
  goodAddressCount?: number
}


