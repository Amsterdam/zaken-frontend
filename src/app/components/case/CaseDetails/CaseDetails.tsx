import styled from "styled-components"
import { DefinitionList, CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import type { DefinitionListData } from "@amsterdam/wonen-ui"
import { useCase } from "app/state/rest"
import ChangeableSubject from "./ChangeSubject/ChangeableSubject"
import ChangeHousingCorporation from "./ChangeHousingCorporation/ChangeHousingCorporation"
import CaseSensitive from "../icons/CaseSensitive"
import CaseEnforcement from "../icons/CaseEnforcement"
import translationsCaseStates from "app/translations/translationsCaseStates"
import EditableTag from "./EditableTag/EditableTag"

type Props = {
  caseId: Components.Schemas.CaseCreate["id"]
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  > div {
    flex: 1;
    min-width: 60%;
  }
`

const getDataFirstCol = (caseItem?: Components.Schemas.CaseCreate) => {
  if (caseItem === undefined) {
    return undefined
  }
  const { id, start_date, sensitive, previous_case, is_enforcement_request, state } = caseItem
  const data: DefinitionListData = {
    "Zaak ID": (
      <Wrap>
        <CaseIdDisplay id={ id } />
        <CaseSensitive isVisible={ sensitive }/>
        <CaseEnforcement isVisible={ is_enforcement_request } />
      </Wrap>
    ),
    "Status": translationsCaseStates[state],
    "Startdatum": <DateDisplay date={ start_date ?? undefined } emptyText="-" />
  }
  if (previous_case) {
    data["Overgedragen zaak"] = previous_case
  }
  data["Tag"] = <EditableTag case={ caseItem } />
  return data
}

const getDataSecondCol = (caseItem?: Components.Schemas.CaseCreate) => {
  if (caseItem === undefined) {
    return undefined
  }

  const { id, theme, reason, project, subjects, address } = caseItem
  const hasProject = project?.name !== undefined
  const data: DefinitionListData = {
    "Thema": theme.name,
    "Aanleiding": `${ reason.name }${ hasProject ? ": " : "" }${ hasProject ? project.name : "" }`,
    "Onderwerp(en)": <ChangeableSubject subjects={ subjects } caseId={ id } themeId={ theme.id } />,
    "Corporatie": (
      <ChangeHousingCorporation
        housingCorporationId={ address?.housing_corporation }
        bagId={ address?.bag_id }
        caseId={ id }
      />
    )
  }
  return data
}

const CaseDetails: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useCase(caseId)

  const dataFirstCol = getDataFirstCol(data)
  const dataSecondCol = getDataSecondCol(data)

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
