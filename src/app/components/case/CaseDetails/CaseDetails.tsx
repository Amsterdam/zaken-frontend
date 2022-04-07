import styled from "styled-components"
import { DefinitionList, CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import { useCase } from "app/state/rest"
import ChangeableSubject from "../tasks/ChangeSubject/ChangeableSubject"
import DisplayCorporation from "./DisplayCorporation"
import SensitiveCaseIcon from "../icons/SensitiveCaseIcon/SensitiveCaseIcon"
import EnforcementIcon from "../icons/EnforcementIcon/EnforcementIcon"

const Wrap = styled.div`
  display: flex;
  align-items: center;
`

type Props = {
  caseId: Components.Schemas.Case["id"]
  isClosed: boolean
}

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  > div {
    flex: 1;
    min-width: 60%;
  }
`

const getDataFirstCol = (caseItem?: Components.Schemas.Case) => {
  if (caseItem === undefined) return
  const { id, theme, start_date, sensitive, previous_case, is_enforcement_request } = caseItem
  const data: any = {
    "Zaak ID": (
      <Wrap>
        <CaseIdDisplay id={ id } />
        <SensitiveCaseIcon sensitive={ sensitive }/>
        {is_enforcement_request && <EnforcementIcon />}
      </Wrap>
    ),
    "Thema": theme.name,
    "Startdatum": <DateDisplay date={ start_date ?? undefined } emptyText="-" />
  }
  if (previous_case) {
    data["Overgedragen zaak"] = previous_case
  }
  return data
}

const getDataSecondCol = (isClosed: boolean, caseItem?: Components.Schemas.Case) => {
  if (caseItem === undefined) return
  const { id, theme, reason, project, subjects, address: { housing_corporation } } = caseItem
  const hasProject = project?.name !== undefined
  const data: any = {
    "Aanleiding": `${ reason.name }${ hasProject ? ": " : "" }${ hasProject ? project.name : "" }`,
    "Onderwerp(en)": isClosed
      ? subjects.map((subject) => subject.name).join(", ")
      : <ChangeableSubject subjects={ subjects } caseId={ id } themeId={ theme.id } />
  }
  if (theme.id === 6) {
    data["Corporatie"] = <DisplayCorporation id={ housing_corporation } />
  }
  return data
}

const CaseDetails: React.FC<Props> = ({ caseId, isClosed }) => {
  const [data, { isBusy }] = useCase(caseId)

  const dataFirstCol = getDataFirstCol(data)
  const dataSecondCol = getDataSecondCol(isClosed, data)

  return (
    <StyledDiv>
      <DefinitionList
        loading={ isBusy }
        numLoadingRows={ 2 }
        hasRowsSeperated={ false }
        data={ dataFirstCol }
      />
      <DefinitionList
        loading={ isBusy }
        numLoadingRows={ 2 }
        hasRowsSeperated={ false }
        data={ dataSecondCol }
      />
    </StyledDiv>
  )
}

export default CaseDetails
