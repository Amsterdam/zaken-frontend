import LinkButton from "app/components/shared/LinkButton/LinkButton"

const columns = [
  {
    header: "Adres",
    dataIndex: "weergavenaam",
    minWidth: 300
  }, {
    dataIndex: "adresseerbaarobject_id",
    minWidth: 100,
    render: () => <LinkButton text="Bekijk" />
  }
]

export default columns
