import { Fragment } from 'react';
import { ThemeProvider, GlobalStyle } from '@amsterdam/asc-ui';
import { LocationProvider } from '@reach/router';

import KeycloakProvider from 'app/state/auth/keycloak/KeycloakProvider';
import initializedCallback from 'app/state/auth/keycloak/initializedCallback';
import Router from 'app/routing/components/Router';
import FlashMessageProvider from 'app/state/flashMessages/FlashMessageProvider';
import ApiProvider from 'app/state/rest/provider/ApiProvider';
import ValueProvider from 'app/state/context/ValueProvider';
import isLocalDevelopment from 'app/state/auth/keycloak/isLocalDevelopment';
import { ErrorBoundary } from '@sentry/react';
import PageTitle from 'app/routing/components/PageTitle';

const SentryErrorBoundary = process.env.REACT_APP_ENVIRONMENT !== undefined ? ErrorBoundary : Fragment;

function App() {
  return (
    <SentryErrorBoundary>
      <PageTitle />
      <ThemeProvider>
        <GlobalStyle />
        <KeycloakProvider shouldInitialize={isLocalDevelopment === false} initializedCallback={initializedCallback}>
          <LocationProvider>
            <FlashMessageProvider>
              <ApiProvider>
                <ValueProvider>
                  <Router />
                </ValueProvider>
              </ApiProvider>
            </FlashMessageProvider>
          </LocationProvider>
        </KeycloakProvider>
      </ThemeProvider>
    </SentryErrorBoundary>
  );
}

export default App;
