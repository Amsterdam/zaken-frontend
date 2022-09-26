import styled, { css } from "styled-components"
import { Checkbox, Label, themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  districts: Components.Schemas.District[]
  districtNames: Components.Schemas.District["name"][]
  setDistrictNames: (value: Components.Schemas.District["name"][]) => void
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${ themeSpacing(5) };
`

const style = css`
  line-height: 18px;
  font-size: 18px;
  font-weight: 600;
  width: 100%;

  span {
    margin: ${ themeSpacing(2) } 0;
    align-items: center;
    display: flex;
  }
`

const StyledLabel = styled(Label)`
  ${ style }
`

const DistrictsFilter: React.FC<Props> = ({ districts, districtNames, setDistrictNames }) => {

  const onChangeDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    let newDistrictNames = [...districtNames]
    if (checked) {
      newDistrictNames.push(id)
    } else {
      newDistrictNames = districtNames.filter((districtName) => districtName !== id)
    }
    setDistrictNames(newDistrictNames)
  }

  return (
    <StyledDiv>
      <StyledLabel label="Stadsdelen" />
      { districts.map((sortedDistrict) => (
        <Label
          htmlFor={ sortedDistrict.name }
          label={ sortedDistrict.name }
          key={ sortedDistrict.name }
        >
          <Checkbox
            id={ sortedDistrict.name }
            onChange={ onChangeDistrict }
            checked={ districtNames.includes(sortedDistrict.name) }
          />
        </Label>
        ))
      }
    </StyledDiv>
  )
}

export default DistrictsFilter
