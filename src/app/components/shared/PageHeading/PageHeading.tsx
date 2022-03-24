import routes from 'app/routing/routes';
import find from 'app/routing/utils/find';
import HeadingWithIcon from 'app/components/shared/HeadingWithIcon/HeadingWithIcon';

type Props = {
  titlePostFix?: string | undefined
}
const PageHeading: React.FC<Props> = ({ titlePostFix }) => {
  const route = find(routes, window.location.pathname);
  const pageConfig = route ? routes[route] : undefined;

  return <HeadingWithIcon icon={pageConfig?.icon} header={`${pageConfig?.title ?? ''} ${titlePostFix ?? ''}`} />;
};

export default PageHeading;
