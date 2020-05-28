import React from "react"
import { Header } from "@datapunt/asc-ui"

import DefaultNavigation from "app/features/shared/components/organisms/navigation/DefaultNavigation"
import { MainWrapper } from "../../atoms/MainWrapper/MainWrapper"

const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Header
      title="Zaaksysteem Vakantieverhuur"
      homeLink="http://www.domain.com"
      fullWidth={true}
      navigation={<DefaultNavigation />}
    />
    <MainWrapper>
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
