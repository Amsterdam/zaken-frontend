import { Header } from "@amsterdam/asc-ui";
import styles from "./DefaultLayout.module.css";
import DefaultNavigation from "app/components/shared/navigation/DefaultNavigation";
import MainWrapper from "app/components/layouts/MainWrapper/MainWrapper";
import to from "app/routing/utils/to";
import FlashMessages from "app/components/layouts/FlashMessages/FlashMessages";
import UserInfo from "app/components/shared/UserInfo/UserInfo";
import SkipLinks from "app/components/shared/SkipLinks/SkipLinks";
import BreadCrumbsWrap from "app/components/shared/BreadCrumbs/BreadCrumbsWrap";
import { env } from "app/config/env";

type Props = {
  showSearchButton?: boolean;
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = ({
  showSearchButton = true,
  children,
}) => (
  <>
    <SkipLinks
      linkList={[{ title: "Direct naar: inhoud", target: "a11y_content" }]}
    />
    <div className={ styles.headerWrap }>
      <Header
        tall
        fullWidth={false}
        title={`${env.VITE_APP_TITLE ?? "Amsterdamse Zaak Administratie"} ${env.VITE_ENVIRONMENT_SHORT}`}
        homeLink={to("/")}
        navigation={
          <div className={ styles.menuWrap }>
            <DefaultNavigation showSearchButton={showSearchButton} />
          </div>
        }
        links={<UserInfo />}
      />
      <BreadCrumbsWrap />
    </div>
    <MainWrapper>
      <FlashMessages />
      {children}
    </MainWrapper>
  </>
);

export default DefaultLayout;
