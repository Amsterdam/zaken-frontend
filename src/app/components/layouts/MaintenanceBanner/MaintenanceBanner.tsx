import { Alert } from "@amsterdam/asc-ui"
import styled from "styled-components"
import { IS_MAINTENANCE_PLANNED, IS_MAINTENANCE_IN_PROGRESS } from "app/config/maintenance"

const StyledBanner = styled(Alert)`
  margin: 0;
  border-radius: 0;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`

const MaintenanceBanner: React.FC = () => {
  if (IS_MAINTENANCE_IN_PROGRESS) {
    return null
  }

  if (IS_MAINTENANCE_PLANNED) {
    return (
      <StyledBanner level="warning" dismissible={ false }>
        <strong>Vanavond rond 19:00</strong> is er onderhoud gepland aan het zaaksysteem. De belangrijkste functionaliteiten zijn dan tijdelijk niet beschikbaar. <br/> De verwachtte eindtijd is <strong>vrijdag 28 november rond 21:00 uur</strong>.
      </StyledBanner>
    )
  }

  return null
}

export default MaintenanceBanner
