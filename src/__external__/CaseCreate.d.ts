type CitizenReport = {
  identification: Components.Schemas.CitizenReportCase["identification"]
  nuisance: Components.Schemas.CitizenReportCase["nuisance"]
}

// We override the address key here. Because the generated type expects a complete Address instead of just a bag_id
declare type CaseCreate = Omit<Components.Schemas.CaseDetail, "id" | "address" | "workflows" | "schedules" | "last_updated" | "created"> &
  {
    address: {
      bag_id: Components.Schemas.Address["bag_id"]
    }
    citizen_reports: Omit<Components.Schemas.CitizenReportCase, "id" | "date_added">[]
  }
