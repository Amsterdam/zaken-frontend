import { type MouseEvent, type ReactNode } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "react-oidc-context"
import {
  Grid,
  Menu,
  Page,
  PageHeader,
  SkipLink,
} from "@amsterdam/design-system-react"
// ADS asks for the filled variant in a menu, where one exists.
import {
  ClipboardFillIcon,
  EuroCoinsFillIcon,
  FolderFillIcon,
  LogOutIcon,
  OrganisationChartIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
} from "@amsterdam/design-system-react-icons"
import { useUsersMe } from "@/api/hooks"
import { getLastCasesSearch } from "@/components/cases/useCasesFilters"
import { getLastTasksSearch } from "@/components/tasks/useTasksFilters"
import { env } from "@/config/env"
import { Breadcrumbs } from "./Breadcrumbs"
import { Footer } from "./Footer"
import { RouterLink } from "./RouterLink"

type MenuItem = {
  href: string
  icon: typeof FolderFillIcon
  label: string
  permission?: components["schemas"]["PermissionsEnum"]
  /** The filters you had on that page in this tab: the link goes back to them. */
  getLastSearch?: () => string
}

// Items without the permission are left out (like top-frontend-v2).
// The menu is narrow: the labels are short, without "overzicht".
const menuItems: MenuItem[] = [
  // The start page comes first.
  { href: "/", icon: SearchIcon, label: "Zoeken" },
  {
    href: "/taken",
    icon: ClipboardFillIcon,
    label: "Taken",
    getLastSearch: getLastTasksSearch,
  },
  {
    href: "/zaken",
    icon: FolderFillIcon,
    label: "Zaken",
    getLastSearch: getLastCasesSearch,
  },
  {
    href: "/invorderingen",
    icon: EuroCoinsFillIcon,
    label: "Invordering",
    permission: "access_recovery_check",
  },
  { href: "/bpmn", icon: OrganisationChartIcon, label: "BPMN" },
  { href: "/hulp", icon: QuestionMarkCircleIcon, label: "Hulp" },
]

type Props = {
  children: ReactNode
  /** For a page with its own navigation (e.g. tabs), where the path adds nothing. */
  hideBreadcrumbs?: boolean
}

/**
 * Page layout with the Amsterdam Design System, based on top-frontend-v2.
 * The children are Grid.Cell's: the layout puts them in a Grid.
 */
export function DefaultLayout({ children, hideBreadcrumbs = false }: Props) {
  const auth = useAuth()
  const navigate = useNavigate()
  const { data: me } = useUsersMe()

  const visibleMenuItems = menuItems.filter(
    ({ permission }) =>
      permission === undefined || me?.permissions.includes(permission),
  )

  const onClickItem =
    ({ href, getLastSearch }: MenuItem) =>
    (event: MouseEvent) => {
      event.preventDefault()
      // Straight to the overview with your filters, not by way of the page
      // without them.
      navigate({ pathname: href, search: getLastSearch?.() ?? "" })
    }

  const onSignOut = (event: MouseEvent) => {
    event.preventDefault()
    void auth.signoutRedirect()
  }

  const renderMenuLinks = () => (
    <>
      {visibleMenuItems.map((item) => (
        <Menu.Link
          key={item.href}
          href={item.href}
          icon={item.icon}
          onClick={onClickItem(item)}
        >
          {item.label}
        </Menu.Link>
      ))}
      <Menu.Link href="#" icon={LogOutIcon} onClick={onSignOut}>
        Uitloggen
      </Menu.Link>
    </>
  )

  return (
    <>
      <SkipLink href="#main">Direct naar: inhoud</SkipLink>
      <Page withMenu>
        <PageHeader
          brandName={`${env.VITE_APP_TITLE ?? "Amsterdamse Zaak Administratie"} ${env.VITE_ENVIRONMENT_SHORT ?? ""}`.trim()}
          brandNameShort={`AZA ${env.VITE_ENVIRONMENT_SHORT ?? ""}`.trim()}
          logoLink="/"
          logoLinkComponent={RouterLink}
          noMenuButtonOnWideWindow
          className="ams-page__area--header"
        >
          <Menu>{renderMenuLinks()}</Menu>
        </PageHeader>

        <Menu className="ams-page__area--menu" inWideWindow>
          {renderMenuLinks()}
        </Menu>

        <main className="ams-page__area--body" id="main">
          {/* Pages render one or more Grid.Cell's (white areas in compact mode). */}
          <Grid paddingVertical="large" gapVertical="large">
            {!hideBreadcrumbs && <Breadcrumbs />}
            {children}
          </Grid>
        </main>

        <Footer />
      </Page>
    </>
  )
}
