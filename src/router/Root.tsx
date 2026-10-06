import { Outlet } from "react-router"
import { Feedback } from "@/components/Feedback/Feedback"
import PageTitle from "./PageTitle"

/**
 * What every page has: the title of the browser tab, the feedback button and
 * the page itself. The feedback button is here, inside the router, because
 * sending the feedback uses useApiFetch, which navigates.
 */
export default function Root() {
  return (
    <>
      <PageTitle />
      <Feedback />
      <Outlet />
    </>
  )
}
