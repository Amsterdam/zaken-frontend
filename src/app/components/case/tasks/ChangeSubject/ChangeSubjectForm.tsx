import { Button, Checkbox, Spinner } from '@amsterdam/asc-ui';
import { useCaseThemes, useSubjects } from 'app/state/rest';
import { useState } from 'react';
import { ButtonContainer, StyledLabel, StyledSelect } from './layout';

type Props = {
  onSubmit: (data: any) => void
  isLoading?: boolean
  onCancel: () => void
  subjects: Components.Schemas.Subject[]
  themeId: Components.Schemas.CaseTheme['id']
  initialValues?: { subjects: Components.Schemas.Subject[]}
}

const ChangeSubjectForm: React.FC<Props> = ({
  isLoading, onSubmit, onCancel, themeId, initialValues,
}) => {
  const [subjectsTheme] = useSubjects(themeId);
  const [caseTheme] = useCaseThemes();
  const [otherTheme, setOtherTheme] = useState<number | undefined>(undefined);
  const [otherSubjects] = useSubjects(otherTheme);
  const [selectedSubjects, setSelectedSubjects] = useState<Components.Schemas.Subject[] | undefined>(initialValues?.subjects);

  const isSelected = (subjectId: number) => (
    !!selectedSubjects?.filter((subject) => subject.id === subjectId).length
  );

  const handleCheck = (subject: Components.Schemas.Subject) => {
    if (isSelected(subject.id)) {
      setSelectedSubjects(selectedSubjects?.filter((sub) => sub.id !== subject.id));
    } else {
      setSelectedSubjects([...selectedSubjects || [], subject]);
    }
  };

  const submit = (data: any) => {
    data.subjects = selectedSubjects;
    onSubmit(data);
  };

  type CheckBoxesProps = {
    subjects: Components.Schemas.Subject[]
  }

  function CheckBoxes({ subjects }: CheckBoxesProps) {
    return (
      <>
        {subjects.map((subject) => (
          <StyledLabel
            onClick={() => handleCheck(subject)}
            key={subject.id}
            htmlFor={subject.id.toString()}
            label={subject.name}
          >
            <Checkbox
              id={subject.id.toString()}
              onChange={() => handleCheck(subject)}
              checked={isSelected(subject.id)}
            />
          </StyledLabel>
        ))}
      </>
    );
  }

  return (
    <>
      { subjectsTheme && !isLoading
        ? (
          <>
            <CheckBoxes subjects={subjectsTheme?.results || []} />
            <StyledSelect onChange={(e) => setOtherTheme(parseInt((e.target as HTMLSelectElement).value))}>
              { !otherTheme && <option>Voeg onderwerpen van ander thema toe</option>}
              {caseTheme?.results?.filter((theme) => theme.id !== themeId).map((theme) => (
                <option key={theme.id} value={theme.id}>{theme.name}</option>
              ))}
            </StyledSelect>
            <CheckBoxes subjects={otherSubjects?.results || []} />
            <ButtonContainer>
              <Button onClick={onCancel} variant="primaryInverted">
                Annuleer
              </Button>
              <Button onClick={submit} variant="primary">
                Verwerken
              </Button>
            </ButtonContainer>
          </>
        )
        : <Spinner />}
    </>
  );
};

export default ChangeSubjectForm;
