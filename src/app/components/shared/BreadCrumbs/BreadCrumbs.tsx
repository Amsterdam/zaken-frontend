import { Link, useParams } from '@reach/router';
import { Breadcrumbs } from '@amsterdam/asc-ui';
import to from 'app/routing/utils/to';
import find from 'app/routing/utils/find';
import routes from 'app/routing/routes';

type BreadCrumbsItem = {
  title: string
  to: string
  path: string
}

const BreadCrumbs: React.FC = () => {
  const routeParams = useParams() ?? {};
  const route = find(routes, window.location.pathname);

  const pageConfig = route ? routes[route] : undefined;
  const pathItems = pageConfig?.path?.map((item) => ({ ...item, to: to(item.path, routeParams) })) ?? [];
  const items = pathItems.filter((item): item is BreadCrumbsItem => item.title !== undefined && item.to !== undefined);

  return (
    items.length > 1
      ? (
        <nav>
          <Breadcrumbs>
            { items.map(({ title, to }, index) => <Link key={index} to={to}>{ title }</Link>) }
          </Breadcrumbs>
        </nav>
      )
      : null
  );
};

export default BreadCrumbs;
