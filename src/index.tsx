import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App";
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

console.log("Name:", packageInfo.name, packageInfo.version);
