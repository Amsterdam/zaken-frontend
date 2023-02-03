import { useState } from "react"
import { Button, RadioGroup, Label, Radio } from "@amsterdam/asc-ui"
import { ButtonContainer, StyledButton } from "../layout"

type Props = {
  onSubmit: (id: Components.Schemas.HousingCorporation["id"]) => void
  onCancel: () => void
  housingCorporations: Components.Schemas.HousingCorporation[]
  housingCorporationId: Components.Schemas.HousingCorporation["id"]
}

const ChangeHousingCorporationForm: React.FC<Props> = ({
  onSubmit, onCancel, housingCorporations, housingCorporationId
}) => {
  const [selectedCorpo, setSelectedCorpo] = useState<typeof housingCorporationId>()

  const saveHousingCorporation = () => {
    if (selectedCorpo && selectedCorpo !== housingCorporationId) {
      onSubmit(selectedCorpo)
    } else {
      onCancel()
    }
  }

  return (
    <>
      <RadioGroup name="group">
        {
          housingCorporations.map(housingCorporation => (
            <Label htmlFor={ `housingCorporation-${ housingCorporation.id }` } label={ housingCorporation.name }>
              <Radio
                id={ `housingCorporation-${ housingCorporation.id }` }
                key={ `housingCorporation-${ housingCorporation.id }` }
                checked={ housingCorporation.id === housingCorporationId }
                onChange={() => setSelectedCorpo(housingCorporation.id)}
              />
            </Label>
          ))
        }
      </RadioGroup>
      <ButtonContainer>
        <StyledButton onClick={onCancel} variant="primaryInverted">
          Annuleer
        </StyledButton>
        <Button onClick={ saveHousingCorporation } variant="primary">
          Opslaan
        </Button>
      </ButtonContainer>
    </>
  )
}

export default ChangeHousingCorporationForm
