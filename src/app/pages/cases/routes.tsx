import IndexPage from "app/pages/cases/index/IndexPage"
import DetailsPage from "app/pages/cases/details/DetailsPage"
import DebriefCreatePage from "app/pages/case/debriefings/CreatePage"
import SummonCreatePage from "app/pages/case/summons/CreatePage"
import DecisionCreatePage from "app/pages/case/decisions/CreatePage"
import CompleteCasePage from "app/pages/case/complete/CompleteCasePage"
import CitizenReportPage from "app/pages/case/citizenreports/CreatePage"
import VisitCreatePage from "app/pages/case/visits/CreatePage"
import ScheduleCreatePage from "app/pages/case/schedules/CreatePage"
import TaskCreatePage from "app/pages/case/task/CreatePage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/zaken": {
    title: "Zakenoverzicht",
    Page: IndexPage,
    icon: "Folder",
    subRoutes: {
      ":id": {
        Page: DetailsPage,
        title: "Zaakdetails",
        icon: "Folder",
        permissionName: "access_sensitive_dossiers",
        subRoutes: {
          "afronding/:caseUserTaskId": {
            Page: CompleteCasePage,
            title: "Zaak afronden",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          },
          "taak": {
            Page: TaskCreatePage,
            title: "Taak opvoeren",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          },
          "debriefing/:caseUserTaskId": {
            Page: DebriefCreatePage,
            title: "Debrief terugkoppeling geven",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          },
          "besluit/:caseUserTaskId": {
            Page: DecisionCreatePage,
            title: "Resultaat besluit",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          },
          "aanschrijving/:caseUserTaskId": {
            Page: SummonCreatePage,
            title: "Resultaat aanschrijving",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          },
          "inplanning/:caseUserTaskId": {
            Page: ScheduleCreatePage,
            title: "Bezoek inplannen",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          },
          "huisbezoek/:caseUserTaskId": {
            Page: VisitCreatePage,
            title: "Resultaat bezoek",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          },
          "melding/:caseUserTaskId": {
            Page: CitizenReportPage,
            title: "Melding verwerken",
            icon: "Edit",
            permissionName: "access_sensitive_dossiers"
          }
        }
      }
    }
  }
}
