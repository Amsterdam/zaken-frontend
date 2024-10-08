import IndexPage from "app/pages/cases/index/IndexPage"
import DetailsPage from "app/pages/cases/details/DetailsPage"
import DebriefCreatePage from "app/pages/case/debriefings/CreatePage"
import SummonCreatePage from "app/pages/case/summons/CreatePage"
import DecisionCreatePage from "app/pages/case/decisions/CreatePage"
import QuickDecisionCreatePage from "app/pages/case/quick-decisions/CreatePage"
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
        subRoutes: {
          "afronding/:caseUserTaskId": {
            Page: CompleteCasePage,
            title: "Zaak afronden",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "taak": {
            Page: TaskCreatePage,
            title: "Taak opvoeren",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "debriefing/:caseUserTaskId": {
            Page: DebriefCreatePage,
            title: "Debrief terugkoppeling geven",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "besluit/:caseUserTaskId": {
            Page: DecisionCreatePage,
            title: "Resultaat besluit",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "snel-besluit/:caseUserTaskId": {
            Page: QuickDecisionCreatePage,
            title: "Resultaat besluit",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "aanschrijving/:caseUserTaskId": {
            Page: SummonCreatePage,
            title: "Resultaat aanschrijving",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "inplanning/:caseUserTaskId": {
            Page: ScheduleCreatePage,
            title: "Bezoek inplannen",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "huisbezoek/:caseUserTaskId": {
            Page: VisitCreatePage,
            title: "Resultaat bezoek",
            icon: "Edit",
            permissionNames: ["perform_task"]
          },
          "melding/:caseUserTaskId": {
            Page: CitizenReportPage,
            title: "Melding verwerken",
            icon: "Edit",
            permissionNames: ["perform_task"]
          }
        }
      }
    }
  }
}
