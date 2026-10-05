import { Outlet } from "react-router"
import PageTitle from "./PageTitle"

/** What every page has: the title of the browser tab, and the page itself. */
export default function Root() {
  return (
    <>
      <PageTitle />
      <Outlet />
    </>
  )
}
