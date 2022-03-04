import { DateDisplay, isDate, CaseIdDisplay } from "@amsterdam/wonen-ui"
import styled from "styled-components"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"
import SensitiveCaseIcon from "app/components/case/SensitiveCaseIcon/SensitiveCaseIcon"

const Wrap = styled.div`
  display: flex;
`

const getStatus = (record: Record<string, any>) => {
  const { current_states, end_date } = record
  if (current_states.length > 0) {
    // Ontdubbelen
    const arr = current_states.map((status: any) => status.status_name)
    const uniqueArray = Array.from(new Set(arr))
    return uniqueArray.join(", ")
  }
  if (isDate(end_date)) {
    return "Afgerond"
  }
  return "-"
}

const getColumns = (sorting: any) => {

  const columns = [
    {
      header: "Zaak ID",
      dataIndex: "id",
      render: (text: any, record: any) => (
        <Wrap>
          <CaseIdDisplay id={ record.id } />
          <SensitiveCaseIcon sensitive={ record.sensitive }/>
        </Wrap>
      )
    }, {
      header: "Straat",
      dataIndex: "address.street_name",
      sorter: (a: any, b: any) => a?.address?.full_address.localeCompare(b?.address?.full_address),
      sortOrder: sorting.dataIndex === "address.street_name" && sorting.order,
      minWidth: 250,
      render: (text: any, record: any) => {
        const { number, suffix, suffix_letter } = record.address
        return `${ text } ${ number }${ suffix ? "-" : "" }${ suffix || "" }${ suffix_letter ? "-" : "" }${ suffix_letter || "" }`
      }
    }, {
      header: "Postcode",
      dataIndex: "address.postal_code",
      sorter: (a: any, b: any) => a?.address?.postal_code.localeCompare(b?.address?.postal_code),
      sortOrder: sorting.dataIndex === "address.postal_code" && sorting.order
    }, {
      header: "Status",
      dataIndex: "current_states",
      /*
      ** At the moment current_states can not be sorted in the BE.
      ** For now the sorter is disabled.
      */
      // sorter: (a: any, b: any) => {
      //   const aValue = getStatus(a)
      //   const bValue = getStatus(b)
      //   return aValue.localeCompare(bValue)
      // },
      minWidth: 200,
      render: (current_states: any, record: any) => getStatus(record)
    }, {
      header: "Aanleiding",
      dataIndex: "reason.name",
      minWidth: 140
    }, {
      header: "Startdatum",
      dataIndex: "start_date",
      sorter: (a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
      defaultSortOrder: "DESCEND" as const,
      sortOrder: sorting.dataIndex === "start_date" && sorting.order,
      minWidth: 100,
      render: (text: any) => <DateDisplay date={ text } emptyText="-" />
    }, {
      header: "Laatst gewijzigd",
      dataIndex: "last_updated",
      sorter: (a: any, b: any) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
      sortOrder: sorting.dataIndex === "last_updated" && sorting.order,
      minWidth: 100,
      render: (text: any) => <DateDisplay date={ text } emptyText="-" />
    }, {
      dataIndex: "navigateId",
      minWidth: 140,
      render: (id: any, record: any) => <TableAction to={ to("/zaken/:id", { id: record.id }) }>Zaakdetails</TableAction>
    }
  ]

  return columns
}

export default getColumns
