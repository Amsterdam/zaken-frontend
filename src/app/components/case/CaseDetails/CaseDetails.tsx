import styled from "styled-components"
import { DefinitionList, CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import type { DefinitionListData } from "@amsterdam/wonen-ui"
import { useCase } from "app/state/rest"
import ChangeableSubject from "./ChangeSubject/ChangeableSubject"
import ChangeHousingCorporation from "./ChangeHousingCorporation/ChangeHousingCorporation"
import SensitiveCaseIcon from "../icons/SensitiveCaseIcon/SensitiveCaseIcon"
import EnforcementIcon from "../icons/EnforcementIcon/EnforcementIcon"
import { isThemeWithCorporations } from "app/components/case/themes/helpers"
import translationsCaseStates from "app/translations/translationsCaseStates"
import EditableTag from "./EditableTag/EditableTag"

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

const getDataFirstCol = (caseItem?: Components.Schemas.CaseCreate) => {
  if (caseItem === undefined) {
    return undefined
  }
  const { id, start_date, sensitive, previous_case, is_enforcement_request, state } = caseItem
  const data: DefinitionListData = {
    "Zaak ID": (
      <Wrap>
        <CaseIdDisplay id={ id } />
        <SensitiveCaseIcon sensitive={ sensitive }/>
        <EnforcementIcon show={ is_enforcement_request } />
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

  const { id, theme, reason, project, subjects, address: { housing_corporation, bag_id } } = caseItem
  const hasProject = project?.name !== undefined
  const showHousingCorporation = isThemeWithCorporations(theme.id)
  const data: DefinitionListData = {
    "Thema": theme.name,
    "Aanleiding": `${ reason.name }${ hasProject ? ": " : "" }${ hasProject ? project.name : "" }`,
    "Onderwerp(en)": <ChangeableSubject subjects={ subjects } caseId={ id } themeId={ theme.id } />
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
