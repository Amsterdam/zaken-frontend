import { useEffect } from 'react';
import { globalHistory } from '@reach/router';
import routes from 'app/routing/routes';
import find from '../utils/find';

const PAGE_TITLE = process.env.REACT_APP_PAGE_TITLE ?? '';

const setPageTitle = () => {
  const route = find(routes, window.location.pathname);
  const pageConfig = route ? routes[route] : undefined;
  const title = pageConfig?.title ? `${pageConfig.title} | ${PAGE_TITLE}` : PAGE_TITLE;
  document.title = title;
};

const PageTitle: React.FC = () => {
  useEffect(() => {
    setPageTitle();
    return globalHistory.listen(({ action }) => {
      if (action !== 'PUSH') return;
      setPageTitle();
    });
  }, []);

  return null;
};
export default PageTitle;
