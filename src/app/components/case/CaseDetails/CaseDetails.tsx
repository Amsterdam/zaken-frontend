import styled from "styled-components"
import { DefinitionList, CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import { useCase } from "app/state/rest"
import ChangeableSubject from "../tasks/ChangeSubject/ChangeableSubject"
import SensitiveCaseIcon from "../SensitiveCaseIcon/SensitiveCaseIcon"
import DisplayCorporation from "./DisplayCorporation"

const Wrap = styled.div`
  display: flex;
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
  const { id, theme, start_date, sensitive, previous_case } = caseItem
  const data: any = {
    "Zaak ID": (
      <Wrap>
        <CaseIdDisplay id={ id } />
        <SensitiveCaseIcon sensitive={ sensitive }/>
      </Wrap>
    ),
    "Thema": theme.name,
    "Startdatum": <DateDisplay date={ start_date ?? undefined } emptyText="-" />
  }
  if (previous_case) {
    data["Gerelateerde zaak"] = previous_case
  }
  return data
}

const getDataSecondCol = (isClosed: boolean, caseItem?: Components.Schemas.Case) => {
  if (caseItem === undefined) return
  const { id, theme, reason, project, subjects, address: { housing_corporation } } = caseItem
  const data: any = {
    "Aanleiding": project?.name !== undefined ? `Project: ${ project.name }` : reason.name,
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
