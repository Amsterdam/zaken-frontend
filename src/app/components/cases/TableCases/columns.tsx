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
    return current_states.map((status: any) => status.status_name).join(", ")
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
      header: "Adres",
      dataIndex: "address.full_address",
      sorter: (a: any, b: any) => a?.address?.full_address.localeCompare(b?.address?.full_address),
      sortOrder: sorting.dataIndex === "address.full_address" && sorting.order,
      minWidth: 300
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
      minWidth: 100,
      render: (current_states: any, record: any) => getStatus(record)
    }, {
      header: "Aanleiding",
      dataIndex: "reason.name"
      // sorter: (a: any, b: any) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
      // defaultSortOrder: "DESCEND" as const,
      // sortOrder: sorting.dataIndex === "last_updated" && sorting.order,
      // minWidth: 100
      // render: (text: any) => <DateDisplay date={ text } emptyText="-" />
    }, {
      header: "Onderwerp",
      dataIndex: "subjects",
      // sorter: (a: any, b: any) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
      // defaultSortOrder: "DESCEND" as const,
      // sortOrder: sorting.dataIndex === "last_updated" && sorting.order,
      // minWidth: 100
      render: (subjects: any) => subjects.map((subject: any) => subject.name).join(", ")
    }, {
      header: "Startdatum",
      dataIndex: "start_date",
      // sorter: (a: any, b: any) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
      // defaultSortOrder: "DESCEND" as const,
      // sortOrder: sorting.dataIndex === "last_updated" && sorting.order,
      minWidth: 100,
      render: (text: any) => <DateDisplay date={ text } emptyText="-" />
    }, {
      header: "Laatst gewijzigd",
      dataIndex: "last_updated",
      sorter: (a: any, b: any) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
      defaultSortOrder: "DESCEND" as const,
      sortOrder: sorting.dataIndex === "last_updated" && sorting.order,
      minWidth: 100,
      render: (text: any) => <DateDisplay date={ text } emptyText="-" />
    }, {
      dataIndex: "id",
      minWidth: 140,
      render: (id: any) => <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
    }
  ]

  return columns
}

export default getColumns
