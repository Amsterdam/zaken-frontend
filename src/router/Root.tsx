import { Outlet } from "react-router"
import { Feedback } from "@/components/Feedback/Feedback"
import PageTitle from "./PageTitle"

/**
 * What every page has: the title of the browser tab, the old feedback button
 * (it opens the feedback dialog too) and the page itself.
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
