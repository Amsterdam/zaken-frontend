import "./polyfills/"

import { StrictMode } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { name, version } from "../package.json"

// Sentry
import initSentry from "./app/sentry/init"
initSentry()

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

console.log("Name:", name, version)
console.log("Commit hash:", process.env.REACT_APP_GIT_COMMIT_HASH ?? "n/a")
