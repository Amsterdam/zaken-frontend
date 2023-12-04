import { useState } from "react"
import { Button, RadioGroup, Label, Radio } from "@amsterdam/asc-ui"
import { useTags, useCase } from "app/state/rest"
import { ButtonContainer, StyledButton } from "../layout"


type Props = {
  onCancel: () => void
  case: Components.Schemas.CaseCreate
}

const ChangeTagForm: React.FC<Props> = ({ case: caseItem, onCancel }) => {
  const [selectedTag, setSelectedTag] = useState<Components.Schemas.Tag["id"] | undefined>(undefined)
  const [data] = useTags(caseItem.theme.id)
  const [, { execPatch }] = useCase(caseItem.id)

  const submit = () => {
    const tag_ids = selectedTag ? [selectedTag] : []
    execPatch( { tag_ids })
  }

  const tags = data?.results ?? []
  const initialValue = caseItem.tags.length > 0 ? caseItem.tags[0].id : "-"
  return (
    <>
      <RadioGroup name="tags">
        <Label htmlFor="-" label="-">
          <Radio id="-" onChange={ () => setSelectedTag(undefined) } />
        </Label>
        { tags.map(tag => (
          <Label htmlFor={ `tag-radio-option-${ tag.id }` } label={ tag.name } key={ `tag-radio-option-${ tag.id }` }>
            <Radio
              id={ `tag-radio-option-${ tag.id }` }
              checked={ initialValue === tag.id }
              onChange={ () => setSelectedTag(tag.id) }
            />
          </Label>
        ))}
      </RadioGroup>
      <ButtonContainer>
        <StyledButton onClick={ onCancel } variant="primaryInverted">
          Annuleer
        </StyledButton>
        <Button onClick={ submit } variant="primary">
          Opslaan
        </Button>
      </ButtonContainer>
    </>
  )
}

export default ChangeTagForm
