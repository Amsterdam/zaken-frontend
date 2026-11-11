import { useForm, useWatch } from "react-hook-form"
import { useNavigate } from "react-router"
import { Column, Paragraph } from "@amsterdam/design-system-react"
import {
  CheckboxControlGroup,
  RadioControl,
  SelectControl,
} from "@amsterdam/ee-ads-rhf"
import {
  useAllowedJumpWorkflows,
  useCaseThemes,
  useProjects,
  useReasons,
  useSubjects,
} from "@/api/hooks"
import { FormPage } from "@/components/FormPage/FormPage"
import type { ImportValidationLocationState } from "@/pages/import/importFlow"

type Option = { label: string; value: string }

type FormValues = {
  theme: string
  reason: string
  project: string
  subjects: string[]
  jump_to: string
}

const emptyValues: FormValues = {
  theme: "",
  reason: "",
  project: "",
  subjects: [],
  jump_to: "",
}

const REASON_PROJECT = "Project"

const toOptions = (options: { id: number; name: string }[] = []): Option[] =>
  options.map(({ id, name }) => ({ label: name, value: String(id) }))

const ImportTemplatePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: themes } = useCaseThemes()
  const { data: allowedJumpWorkflows } = useAllowedJumpWorkflows()

  const form = useForm<FormValues>({ defaultValues: emptyValues })
  const [theme, reason] = useWatch({
    control: form.control,
    name: ["theme", "reason"],
  })
  const themeId = theme !== "" ? Number(theme) : undefined
  const { data: reasons } = useReasons(themeId)
  const { data: projects } = useProjects(themeId)
  const { data: subjects } = useSubjects(themeId)
  const reasonName = reasons?.results.find(({ id }) => String(id) === reason)?.name

  const onSubmit = (values: FormValues) => {
    const state: ImportValidationLocationState = {
      templateCase: {
        themeId: Number(values.theme),
        reasonId: Number(values.reason),
        ...(reasonName === REASON_PROJECT &&
          values.project !== "" && {
            projectId: Number(values.project),
          }),
        subjectIds: values.subjects.map(Number),
        jumpTo: values.jump_to !== "" ? values.jump_to : null,
      },
    }
    navigate("/import/valideren", { state })
  }

  return (
    <FormPage<FormValues>
      title="Importtemplate kiezen"
      form={form}
      onSubmit={onSubmit}
      submitText="Stap 1 afronden: naar valideren"
      onCancel={() => navigate("/")}
      intro={
        <Column gap="small">
          <Paragraph>
            1. Template kiezen {"->"} 2. Valideren {"->"} 3. Importstatus
          </Paragraph>
          <Paragraph>
            Kies welk type zaak als template gebruikt moet worden voor deze bulk import.
          </Paragraph>
        </Column>
      }
    >
      <RadioControl<FormValues>
        name="theme"
        label="Kies het thema voor deze import"
        options={toOptions(themes?.results ?? [])}
        registerOptions={{
          required: "Kies een thema.",
          onChange: () => {
            form.setValue("reason", "")
            form.setValue("project", "")
            form.setValue("subjects", [])
          },
        }}
      />
      <RadioControl<FormValues>
        name="reason"
        label="Aanleiding"
        options={toOptions(reasons?.results ?? [])}
        registerOptions={{ required: "Kies een aanleiding." }}
        shouldShow={themeId !== undefined}
      />
      <SelectControl<FormValues>
        name="project"
        label="Projectnaam"
        options={[{ label: "Maak een keuze", value: "" }, ...toOptions(projects?.results)]}
        registerOptions={{
          validate: (value) =>
            reasonName !== REASON_PROJECT || value !== "" || "Kies een project.",
        }}
        shouldShow={reasonName === REASON_PROJECT}
      />
      <CheckboxControlGroup<FormValues>
        name="subjects"
        label="Onderwerp(en)"
        options={toOptions(subjects?.results)}
        registerOptions={{
          required: "Kies ten minste een onderwerp.",
        }}
        shouldShow={themeId !== undefined}
      />
      <SelectControl<FormValues>
        name="jump_to"
        label="Process voor zaken doorzetten naar"
        options={[
          { label: "Niet doorzetten", value: "" },
          ...(allowedJumpWorkflows ?? []),
        ]}
      />
    </FormPage>
  )
}

export default ImportTemplatePage






