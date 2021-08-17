import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useCasesByBagId } from "app/state/rest"
import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"
import navigateTo from "app/routing/navigateTo"
import { CaseIdDisplay } from "@amsterdam/wonen-ui"
import React from "react"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  openCases?: boolean
  title?: string
  emptyText?: string
}

const defaultTitle = "Zaken"
const defaultEmptyText = "Op dit adres zijn er geen zaken"

const StyledHeading = styled(Heading)`
  margin-bottom: ${ themeSpacing(4) };
`

const columns = [
  { header: "Zaak ID", minWidth: 100, render: (id: string | number | boolean | undefined | null | React.ReactNode) => (typeof id === "string" ? <CaseIdDisplay id={ id } /> : null) as React.ReactNode },
  { header: "Thema", minWidth: 100 },
  { header: "Startdatum", minWidth: 100 },
  { header: "Huidige status", minWidth: 100 },
  { minWidth: 140 }
]

const CasesByBagId: React.FC<Props> = ({ bagId, openCases = false, title = defaultTitle, emptyText = defaultEmptyText }) => {

  const [data, { isBusy }] = useCasesByBagId(bagId, openCases)
  const values = useValues(data?.results)
  const numCases = values?.length ?? 0

  const onClickRow = (event: React.MouseEvent, index: number, data: Exclude<typeof values, undefined>[0]) =>
    navigateTo("/zaken/:id", { id: data[0] })

  return (
    <>
      <StyledHeading>{ title }{ numCases > 0 && ` (${ numCases })` }</StyledHeading>
      <Table
        hasFixedColumn
        columns={ columns }
        loading={ isBusy }
        numLoadingRows={ 1 }
        data={ values }
        showHeadWhenEmpty={ false }
        onClickRow={ onClickRow }
        noValuesPlaceholder={ emptyText }
      />
    </>
  )
}
export default CasesByBagId