import React from "react"
import { Header } from "@datapunt/asc-ui"

import DefaultNavigation from "app/features/shared/components/organisms/navigation/DefaultNavigation"
import { MainWrapper } from "app/features/shared/components/atoms/MainWrapper/MainWrapper"
import to from "app/features/shared/routing/to"

const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Header
      title="Zaaksysteem Vakantieverhuur"
      homeLink={to("/")}
      fullWidth={true}
      navigation={<DefaultNavigation />}
    />
    <MainWrapper>
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
