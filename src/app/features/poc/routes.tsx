import HomePage from "./pages/home/HomePage"
import FooPage from "./pages/foo/FooPage"

// NOTE: please add your own POC-specific routes here.
export default {
  "/": HomePage,
  "/poc/foo/:bar/": FooPage
}
