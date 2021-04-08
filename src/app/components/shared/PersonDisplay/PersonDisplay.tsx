import { FC } from "react"

type Sex = Components.Schemas.Resident["geslachtsaanduiding"]
type Props = {
  sex: Sex
  firstName: string
  namePrefix?: string
  name: string
}

const mapSex = (value: Sex) => {
  switch (value) {
    case "M": return "Dhr. "
    case "V": return "Mvr. "
    default: return ""
  }
}

const PersonDisplay: FC<Props> = ({ sex, firstName, namePrefix, name }) =>
  <>{ `${ mapSex(sex) }${ firstName } ${ namePrefix ? `${ namePrefix } ` : "" }${ name }` }</>

export default PersonDisplay
