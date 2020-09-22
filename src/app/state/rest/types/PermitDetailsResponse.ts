export type PermitDetailsResponse =
  {
    permit_granted: boolean
    permit_type: "BED_AND_BREAKFAST" | "VAKANTIEVERHUUR" | "PERMIT_UNKNOWN"
    processed: string
    date_from: null | string
    date_to: null | string
    decos_join_web_url: null | string
  }[]
