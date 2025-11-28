import { Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"
import { FullScreenWrapper } from "app/components/shared/loading"

const MaintenanceContainer = styled(FullScreenWrapper)`
  flex-direction: column;
  background-color: #ffffff;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  padding: ${ themeSpacing(8) };
  text-align: center;

  h1 {
    margin-bottom: ${ themeSpacing(4) };
    display: block;
    text-align: center;
  }
`

const ContentWrapper = styled.div`
  max-width: 600px;
`

const MaintenanceMode: React.FC = () => (
  <MaintenanceContainer>
    <ContentWrapper>
      <Heading forwardedAs="h1">Onderhoud in uitvoering</Heading>
      <Paragraph>
        Op dit moment voeren wij technisch onderhoud uit aan het zaaksysteem. 
        Functionaliteiten zijn tijdelijk niet beschikbaar, en het is niet mogelijk om nieuwe zaken te openen of taken uit te voeren.
      </Paragraph>
      <Paragraph>
        De verwachtte eindtijd is <strong>vrijdag 28 november rond 21:00 uur</strong>.
      </Paragraph>
    </ContentWrapper>
  </MaintenanceContainer>
)

export default MaintenanceMode

