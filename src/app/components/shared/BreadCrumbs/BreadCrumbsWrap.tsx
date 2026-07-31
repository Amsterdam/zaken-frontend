import styles from "./BreadCrumbsWrap.module.css";
import BreadCrumbs from "./BreadCrumbs";

const MainWrapper = () => (
  <div className={ styles.wrap }>
    <BreadCrumbs />
  </div>
);

export default MainWrapper;
