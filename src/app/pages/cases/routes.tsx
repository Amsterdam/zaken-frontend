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
        subRoutes: {
          "afronden/:camundaTaskId": {
            Page: CompleteCasePage,
            title: "Zaak afronden",
            icon: "Edit"
          },
          "taak": {
            Page: TaskCreatePage,
            title: "Taak opvoeren",
            icon: "Edit"
          },
          "debriefing/:camundaTaskId": {
            Page: DebriefCreatePage,
            title: "Debrief terugkoppeling geven",
            icon: "Edit"
          },
          "besluit/:camundaTaskId": {
            Page: DecisionCreatePage,
            title: "Resultaat besluit",
            icon: "Edit"
          },
          "aanschrijving/:camundaTaskId": {
            Page: SummonCreatePage,
            title: "Resultaat aanschrijving",
            icon: "Edit"
          },
          "inplanning/:camundaTaskId": {
            Page: ScheduleCreatePage,
            title: "Bezoek inplannen",
            icon: "Edit"
          },
          "huisbezoek/:camundaTaskId": {
            Page: VisitCreatePage,
            title: "Resultaat bezoek",
            icon: "Edit"
          },
          "melding/:camundaTaskId": {
            Page: CitizenReportPage,
            title: "Melding verwerken",
            icon: "Edit"
          }
        }
      }
    }
  }
}
