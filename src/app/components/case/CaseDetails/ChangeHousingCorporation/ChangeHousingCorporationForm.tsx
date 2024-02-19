import { useState } from "react"
import { Button, RadioGroup, Label, Radio } from "@amsterdam/asc-ui"
import { ButtonContainer, StyledButton } from "../layout"

type Props = {
  onSubmit: (id?: Components.Schemas.HousingCorporation["id"] | null) => void
  onCancel: () => void
  housingCorporations: Components.Schemas.HousingCorporation[]
  housingCorporationId?: Components.Schemas.HousingCorporation["id"] | null
}

const ChangeHousingCorporationForm: React.FC<Props> = ({
  onSubmit, onCancel, housingCorporations, housingCorporationId
}) => {
  const [selectedCorpo, setSelectedCorpo] = useState<typeof housingCorporationId | undefined | null>(null)

  const saveHousingCorporation = () => {
    if (selectedCorpo !== housingCorporationId) {
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
            <Label
              htmlFor={ `housingCorporation-${ housingCorporation.id }` }
              label={ housingCorporation.name }
              key={ `housingCorporation-${ housingCorporation.id }` }
            >
              <Radio
                id={ `housingCorporation-${ housingCorporation.id }` }
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
