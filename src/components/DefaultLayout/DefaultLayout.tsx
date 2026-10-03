import { type MouseEvent, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
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
  QuestionMarkCircleIcon,
  SearchIcon,
} from "@amsterdam/design-system-react-icons"
import { useUsersMe } from "@/api/hooks"
import { env } from "app/config/env"
import { useDecodedToken } from "app/state/auth/oidc/useDecodedToken"
import { Breadcrumbs } from "./Breadcrumbs"
import { FlashMessages } from "./FlashMessages"
import { RouterLink } from "./RouterLink"

type MenuItem = {
  href: string
  icon: typeof FolderFillIcon
  label: string
  permission?: components["schemas"]["PermissionsEnum"]
}

// Items without the permission are left out (like top-frontend-v2).
// The menu is narrow: a long word gets a soft hyphen (\u00AD) where it may
// break, e.g. "Zaken-overzicht" (see design-system-overrides.css).
const menuItems: MenuItem[] = [
  // The start page comes first.
  { href: "/", icon: SearchIcon, label: "Zoeken" },
  { href: "/taken", icon: ClipboardFillIcon, label: "Taken\u00ADoverzicht" },
  { href: "/zaken", icon: FolderFillIcon, label: "Zaken\u00ADoverzicht" },
  {
    href: "/invorderingen",
    icon: EuroCoinsFillIcon,
    label: "Invordering",
    permission: "access_recovery_check",
  },
  { href: "/hulp", icon: QuestionMarkCircleIcon, label: "Hulp" },
]

type Props = {
  children: ReactNode
  /** For a page with its own navigation (e.g. tabs), where the path adds nothing. */
  hideBreadcrumbs?: boolean
}

/**
 * Page layout with the Amsterdam Design System (MIGRATION.md Fase 2), based on
 * top-frontend-v2. Replaces app/components/layouts/DefaultLayout page by page.
 * The children are Grid.Cell's: the layout puts them in a Grid.
 */
export function DefaultLayout({ children, hideBreadcrumbs = false }: Props) {
  const auth = useAuth()
  const navigate = useNavigate()
  const { data: me } = useUsersMe()
  const givenName = useDecodedToken()?.given_name

  const visibleMenuItems = menuItems.filter(
    ({ permission }) =>
      permission === undefined || me?.permissions.includes(permission),
  )

  const onClickItem =
    ({ href }: MenuItem) =>
    (event: MouseEvent) => {
      event.preventDefault()
      navigate(href)
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
        {givenName ? `Uitloggen (${givenName})` : "Uitloggen"}
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
            <FlashMessages />
            {children}
          </Grid>
        </main>
      </Page>
    </>
  )
}

export default DefaultLayout
