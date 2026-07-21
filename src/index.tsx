import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import packageInfo from "../package.json";
import { oidcConfig } from "app/state/auth/oidc/oidcConfig";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log("Name:", packageInfo.name, packageInfo.version);
