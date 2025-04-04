import { DateDisplay, isDate, CaseIdDisplay } from "@amsterdam/wonen-ui"
import LinkButton from "app/components/shared/LinkButton/LinkButton"


const getStatus = (record: Record<string, any>) => {
  const { workflows, end_date } = record
  if (workflows.length > 0) {
    // Ontdubbelen
    const arr = workflows.map((status: any) => status.state.name)
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
      render: (text: any, record: any) => <CaseIdDisplay id={ record.id } />
    }, {
      header: "Straat",
      dataIndex: "address.street_name",
      sorter: (a: any, b: any) => a?.address?.street_name.localeCompare(b?.address?.street_name),
      sortOrder: sorting.dataIndex === "address.street_name" && sorting.order,
      minWidth: 200,
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
      header: "Taak",
      dataIndex: "workflows",
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
      render: (workflows: any, record: any) => getStatus(record)
    }, {
      header: "Aanleiding",
      dataIndex: "reason.name",
      sorter: (a: any, b: any) => a?.reason?.name.localeCompare(b?.reason?.name),
      sortOrder: sorting.dataIndex === "reason.name" && sorting.order,
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
      render: (id: any, record: any) => <LinkButton text="Zaakdetails" />
    }
  ]

  return columns
}

export default getColumns
