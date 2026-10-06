import { type RouteObject } from "react-router"
import AddressDetailsPage from "@/pages/addresses/details/DetailsPage"
import AddressIndexPage from "@/pages/addresses/index/IndexPage"
import PeoplePage from "@/pages/addresses/people/PeoplePage"
import PermitsPage from "@/pages/addresses/permits/PermitsPage"
import AuthPage from "@/pages/auth/AuthPage"
import NotAuthorizedPage from "@/pages/auth/NotAuthorizedPage"
import BpmnPage from "@/pages/bpmn/BpmnPage"
import CitizenReportCreatePage from "@/pages/case/citizenreports/CreatePage"
import CompleteCasePage from "@/pages/case/complete/CompleteCasePage"
import DebriefCreatePage from "@/pages/case/debriefings/CreatePage"
import DecisionCreatePage from "@/pages/case/decisions/CreatePage"
import QuickDecisionCreatePage from "@/pages/case/quick-decisions/CreatePage"
import ScheduleCreatePage from "@/pages/case/schedules/CreatePage"
import SummonCreatePage from "@/pages/case/summons/CreatePage"
import VisitCreatePage from "@/pages/case/visits/CreatePage"
import CreateCasePage from "@/pages/cases/create/CreateCasePage"
import CaseDetailsPage from "@/pages/cases/details/DetailsPage"
import CasesIndexPage from "@/pages/cases/index/IndexPage"
import NotFoundPage from "@/pages/errors/NotFoundPage"
import FinePage from "@/pages/fines/FinePage"
import HelpPage from "@/pages/help/HelpPage"
import HomePage from "@/pages/home/HomePage"
import TasksIndexPage from "@/pages/tasks/IndexPage"
import RequirePermissions from "./RequirePermissions"
import Root from "./Root"
import RouteErrorPage from "./RouteErrorPage"

type Permission = components["schemas"]["PermissionsEnum"]

/**
 * What a route says about itself. Its title is the title of the browser tab
 * and its name in the breadcrumbs; the routes above it are the path to it.
 */
export type RouteHandle = {
  title: string
}

const titled = (title: string): { handle: RouteHandle } => ({
  handle: { title },
})

// The routes below it need (one of) these permissions.
const requires = (...permissions: Permission[]) => ({
  element: <RequirePermissions requiredPermissions={permissions} />,
})

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <RouteErrorPage />,
    ...titled("Home"),
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      // To look at the 403 page without having to lack a permission.
      { path: "403", element: <NotAuthorizedPage /> },
      { path: "bpmn", element: <BpmnPage />, ...titled("BPMN") },
      { path: "hulp", element: <HelpPage />, ...titled("Hulp") },
      {
        path: "taken",
        element: <TasksIndexPage />,
        ...titled("Takenoverzicht"),
      },
      {
        ...requires("access_recovery_check"),
        children: [
          {
            path: "invorderingen",
            element: <FinePage />,
            ...titled("Invorderingscheck"),
          },
        ],
      },
      {
        path: "adres/:bagId",
        ...titled("Adresoverzicht"),
        children: [
          { index: true, element: <AddressIndexPage /> },
          {
            path: "details",
            element: <AddressDetailsPage />,
            ...titled("Adresdetails"),
          },
          {
            ...requires("access_personal_data_register"),
            children: [
              {
                path: "personen",
                element: <PeoplePage />,
                ...titled("Persoonsgegevens"),
              },
            ],
          },
          {
            path: "vergunningen",
            element: <PermitsPage />,
            ...titled("Vergunningen"),
          },
          {
            ...requires("create_case", "create_digital_surveilance_case"),
            children: [
              {
                path: "zaken/nieuw",
                element: <CreateCasePage />,
                ...titled("Nieuwe zaak aanmaken"),
              },
            ],
          },
        ],
      },
      {
        path: "zaken",
        ...titled("Zakenoverzicht"),
        children: [
          { index: true, element: <CasesIndexPage /> },
          {
            path: ":id",
            ...titled("Zaakdetails"),
            children: [
              { index: true, element: <CaseDetailsPage /> },
              {
                ...requires("perform_task"),
                children: [
                  {
                    path: "afronding/:caseUserTaskId",
                    element: <CompleteCasePage />,
                    ...titled("Zaak afronden"),
                  },
                  {
                    path: "debriefing/:caseUserTaskId",
                    element: <DebriefCreatePage />,
                    ...titled("Debrief terugkoppeling geven"),
                  },
                  {
                    path: "besluit/:caseUserTaskId",
                    element: <DecisionCreatePage />,
                    ...titled("Resultaat besluit"),
                  },
                  {
                    path: "snel-besluit/:caseUserTaskId",
                    element: <QuickDecisionCreatePage />,
                    ...titled("Resultaat besluit"),
                  },
                  {
                    path: "aanschrijving/:caseUserTaskId",
                    element: <SummonCreatePage />,
                    ...titled("Resultaat aanschrijving"),
                  },
                  {
                    path: "inplanning/:caseUserTaskId",
                    element: <ScheduleCreatePage />,
                    ...titled("Bezoek inplannen"),
                  },
                  {
                    path: "huisbezoek/:caseUserTaskId",
                    element: <VisitCreatePage />,
                    ...titled("Resultaat bezoek"),
                  },
                  {
                    path: "melding/:caseUserTaskId",
                    element: <CitizenReportCreatePage />,
                    ...titled("Melding verwerken"),
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]
