

type Props = {
  sex: Components.Schemas.Resident["geslachtsaanduiding"]
  firstName: string
  namePrefix?: string
  name: string
}

const mapSex = (value: Components.Schemas.Resident["geslachtsaanduiding"]) => {
  switch (value) {
    case "M": return "Dhr. "
    case "V": return "Mvr. "
    default: return ""
  }
}

const PersonDisplay: React.FC<Props> = ({ sex, firstName, namePrefix, name }) =>
  <>{ `${ mapSex(sex) }${ firstName } ${ namePrefix ? `${ namePrefix } ` : "" }${ name }` }</>

export default PersonDisplay
