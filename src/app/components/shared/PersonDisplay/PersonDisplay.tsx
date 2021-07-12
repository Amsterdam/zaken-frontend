type Props = {
  sex?: Components.Schemas.Resident["geslachtsaanduiding"]
  firstName: string
  namePrefix?: string
  name: string
  personRole?: string
}

const mapSex = (value?: Components.Schemas.Resident["geslachtsaanduiding"]) => {
  switch (value) {
    case "M": return "Dhr. "
    case "V": return "Mvr. "
    default: return ""
  }
}

const PersonDisplay: React.FC<Props> = ({ sex, firstName, namePrefix, name, personRole }) =>
  <>{ `${ mapSex(sex) }${ firstName } ${ namePrefix ? `${ namePrefix } ` : "" }${ name }${ personRole ? `, ${ personRole } ` : "" }` }</>

export default PersonDisplay
