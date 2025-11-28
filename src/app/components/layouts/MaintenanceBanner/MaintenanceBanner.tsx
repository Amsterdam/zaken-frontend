import { Alert } from "@amsterdam/asc-ui"
import styled from "styled-components"

const StyledBanner = styled(Alert)`
  margin: 0;
  border-radius: 0;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`

const IS_MAINTENANCE_PLANNED = true
const IS_MAINTENANCE_IN_PROGRESS = true

const MaintenanceBanner: React.FC = () => 
  IS_MAINTENANCE_PLANNED ? (
    <StyledBanner level="warning" dismissible={ false }>
      <strong>Vanavond rond 19:00</strong> is er onderhoud gepland aan het zaaksysteem. De belangrijkste functionaliteiten zijn dan tijdelijk niet beschikbaar. <br/> De verwachtte eindtijd is <strong>vrijdag 28 november rond 21:00 uur</strong>.
    </StyledBanner>
  ) : IS_MAINTENANCE_IN_PROGRESS ? (
    <StyledBanner level="warning" dismissible={ false }>
      Op dit moment voeren wij onderhoud uit aan het zaaksysteem. Functionaliteiten zijn tijdelijk niet beschikbaar, en we raden aan om op dit moment geen nieuwe zaken te openen of taken uit te voeren. <br/> De verwachtte eindtijd is <strong>vrijdag 28 november rond 21:00 uur</strong>.
    </StyledBanner>
  ) : null

export default MaintenanceBanner
