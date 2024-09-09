import { StrictMode } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import packageInfo from "../package.json"
import { env } from "app/config/env"


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

console.log("Name:", packageInfo.name, packageInfo.version)
console.log("Commit hash:", env.REACT_APP_GIT_COMMIT_HASH ?? "n/a")
