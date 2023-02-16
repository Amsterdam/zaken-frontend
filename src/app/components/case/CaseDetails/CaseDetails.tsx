import styled from "styled-components"
import { DefinitionList, CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import type { DefinitionListData } from "@amsterdam/wonen-ui"
import { useCase } from "app/state/rest"
import ChangeableSubject from "./ChangeSubject/ChangeableSubject"
import ChangeHousingCorporation from "./ChangeHousingCorporation/ChangeHousingCorporation"
import SensitiveCaseIcon from "../icons/SensitiveCaseIcon/SensitiveCaseIcon"
import EnforcementIcon from "../icons/EnforcementIcon/EnforcementIcon"
import { isThemeWithCorporations } from "app/components/case/themes/helpers"

type Props = {
  caseId: Components.Schemas.CaseCreate["id"]
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
`

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  > div {
    flex: 1;
    min-width: 60%;
  }
`

const CLOSED: Components.Schemas.CaseCreate["state"] = "AFGESLOTEN"

const getDataFirstCol = (isClosed: boolean, caseItem?: Components.Schemas.CaseCreate) => {
  if (caseItem === undefined) return
  const { id, start_date, sensitive, previous_case, is_enforcement_request } = caseItem
  const data: DefinitionListData = {
    "Zaak ID": (
      <Wrap>
        <CaseIdDisplay id={ id } />
        <SensitiveCaseIcon sensitive={ sensitive }/>
        <EnforcementIcon show={ is_enforcement_request } />
      </Wrap>
    ),
    "Status": isClosed ? <strong>Gesloten</strong> : "Open",
    "Startdatum": <DateDisplay date={ start_date ?? undefined } emptyText="-" />
  }
  if (previous_case) {
    data["Overgedragen zaak"] = previous_case
  }
  return data
}

const getDataSecondCol = (isClosed: boolean, caseItem?: Components.Schemas.CaseCreate) => {
  if (caseItem === undefined) {
    return undefined
  }

  const { id, theme, reason, project, subjects, address: { housing_corporation, bag_id } } = caseItem
  const hasProject = project?.name !== undefined
  const showHousingCorporation = isThemeWithCorporations(theme.id)
  const data: DefinitionListData = {
    "Thema": theme.name,
    "Aanleiding": `${ reason.name }${ hasProject ? ": " : "" }${ hasProject ? project.name : "" }`,
    "Onderwerp(en)": isClosed
      ? subjects.map((subject) => subject.name).join(", ")
      : <ChangeableSubject subjects={ subjects } caseId={ id } themeId={ theme.id } />
    }
    if (showHousingCorporation) {
      data["Corporatie"] = (
        <ChangeHousingCorporation
          housingCorporationId={ housing_corporation }
          bagId={ bag_id }
          caseId={ id }
        />
      )
    }
  return data
}

const CaseDetails: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useCase(caseId)

  const isClosed = data?.state === CLOSED
  const dataFirstCol = getDataFirstCol(isClosed, data)
  const dataSecondCol = getDataSecondCol(isClosed, data)

  return (
    <StyledDiv>
      <DefinitionList
        loading={ isBusy }
        numLoadingRows={ 2 }
        horizontalBordered={ false }
        data={ dataFirstCol }
      />
      <DefinitionList
        loading={ isBusy }
        numLoadingRows={ 2 }
        horizontalBordered={ false }
        data={ dataSecondCol }
      />
    </StyledDiv>
  )
}

export default CaseDetails
