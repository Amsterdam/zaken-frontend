type CitizenReport = {
  identification: components["schemas"]["CitizenReportCase"]["identification"]
  nuisance: components["schemas"]["CitizenReportCase"]["nuisance"]
}

// We override the address key here. Because the generated type expects a complete Address instead of just a bag_id
declare type CaseCreate = Omit<components["schemas"]["CaseDetail"], "id" | "address" | "workflows" | "schedules" | "last_updated" | "created"> &
  {
    address: {
      bag_id: components["schemas"]["Address"]["bag_id"]
    }
    citizen_reports: Omit<components["schemas"]["CitizenReportCase"], "id" | "date_added">[]
  }
