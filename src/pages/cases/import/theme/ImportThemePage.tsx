import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { Column, OrderedList, Paragraph } from "@amsterdam/design-system-react"
import { RadioControl } from "@amsterdam/ee-ads-rhf"
import { useCaseThemes } from "@/api/hooks"
import { FormPage } from "@/components/FormPage/FormPage"
import type { ImportLocationState } from "@/pages/cases/import/importFlow"

type FormValues = {
  theme: string
}

const ImportThemePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: themes } = useCaseThemes()
  const form = useForm<FormValues>({ defaultValues: { theme: "" } })

  const onSubmit = ({ theme }: FormValues) => {
    const state: ImportLocationState = {
      caseData: { themeId: Number(theme) },
    }
    navigate("/zaken/importeren/controleren", { state })
  }

  return (
    <FormPage<FormValues>
      title="Zaken importeren"
      form={form}
      onSubmit={onSubmit}
      submitText="Volgende stap"
      onCancel={() => navigate("/")}
      summary={
        <Column gap="small">
          <Paragraph>
            Upload een Excel-bestand met adressen en maak voor al die adressen
            in één keer een zaak aan. Dat gaat in drie stappen.
          </Paragraph>
          <OrderedList>
            <OrderedList.Item>
              <strong>Thema kiezen:</strong> kies bij welk thema de zaken horen.
            </OrderedList.Item>
            <OrderedList.Item>
              <strong>Adressen controleren:</strong> upload het Excel-bestand.
              Je ziet per adres of er een zaak voor aangemaakt kan worden. Er
              wordt nog niets opgeslagen.
            </OrderedList.Item>
            <OrderedList.Item>
              <strong>Zaakgegevens kiezen en importeren:</strong> kies de
              aanleiding en de onderwerpen die voor alle zaken gelden. Je kunt
              er ook voor kiezen om alle zaken direct te laten beginnen bij de
              debrief of de aanschrijving. Daarna worden de zaken aangemaakt.
            </OrderedList.Item>
          </OrderedList>
        </Column>
      }
    >
      <RadioControl<FormValues>
        name="theme"
        label="Kies een thema"
        options={(themes?.results ?? []).map(({ id, name }) => ({
          label: name,
          value: String(id),
        }))}
        registerOptions={{ required: "Kies een thema." }}
      />
    </FormPage>
  )
}

export default ImportThemePage
