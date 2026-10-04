// The data of the permits tab of an address. The API schema leaves parts of
// it open ("unknown"), so the shapes are written out here (after top-frontend-v2).

export type PowerBrowserPermit = Omit<
  components["schemas"]["Powerbrowser"],
  "datuM_TOT"
> & {
  omschrijvinG_KORT?: string | null
  datuM_TOT?: string | null
}

export type DecosPermit = {
  permit_granted: "GRANTED" | "NOT_GRANTED" | "UNKNOWN"
  permit_type: string
  raw_data?: Record<string, unknown>
  details?: {
    PERMIT_NAME?: string
    SUBJECT?: string
    ADDRESS?: string
    RESULT?: string
    DATE_VALID_FROM?: string
    DATE_VALID_UNTIL?: string
    DATE_VALID_TO?: string
    APPLICANT?: string
    REQUEST_DATE?: string
    HOLDER?: string
  }
}

export type Melding = {
  gasten: number
  nachten: number
  gemaaktOp: string
  isAangepast: boolean
  isVerwijderd: boolean
  startDatum: string
  eindDatum: string
}

export type Registration = Omit<
  components["schemas"]["RegistrationDetails"],
  "requester"
> & {
  requestForBedAndBreakfast?: boolean
  requester: {
    personalDetails: {
      firstName: string
      lastNamePrefix: string | null
      lastName: string
    }
    email: string
  }
}
