import LinkButton from "app/components/shared/LinkButton/LinkButton"

const columns = [
  {
    header: "Adres",
    dataIndex: "weergavenaam",
    minWidth: 100
  },
  {
    dataIndex: "adresseerbaarobject_id",
    minWidth: 140,
    render: (bagId: any) => <LinkButton text="Bekijk" path={`/adres/${bagId}`}/>
  }
]

export default columns
