import { useState } from "react";
import { Button, RadioGroup, Label, Radio } from "@amsterdam/asc-ui";
import { useTags, useUpdateCase } from "@/api/hooks";
import { ButtonContainer, StyledButton } from "../layout";


type Props = {
  onCancel: () => void
  /** Called when saving is done (also on an error, which is shown as a flash message). */
  onSaved: () => void
  case: components["schemas"]["CaseCreate"]
}

const ChangeTagForm: React.FC<Props> = ({ case: caseItem, onCancel, onSaved }) => {
  const [selectedTag, setSelectedTag] = useState<components["schemas"]["Tag"]["id"] | undefined>(undefined);
  const { data } = useTags(caseItem.theme.id);
  const { mutate: updateCase, isPending } = useUpdateCase(caseItem.id);

  const submit = () => {
    const tag_ids = selectedTag ? [selectedTag] : [];
    updateCase({ tag_ids }, { onSettled: onSaved });
  };

  const tags = data?.results ?? [];
  const initialValue = caseItem.tags.length > 0 ? caseItem.tags[0].id : "-";
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
        <Button onClick={ submit } variant="primary" disabled={ isPending }>
          Opslaan
        </Button>
      </ButtonContainer>
    </>
  );
};

export default ChangeTagForm;
