import IndexPage from "./components/pages/index/IndexPage"
import EditPage from "./components/pages/edit/EditPage"

export default {
  "/case-visits/:caseId": IndexPage,
  "/case-visits/:id/edit": EditPage
}
