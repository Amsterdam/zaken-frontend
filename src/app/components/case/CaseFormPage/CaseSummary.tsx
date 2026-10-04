import { Column, Heading } from "@amsterdam/design-system-react"
import { useCase } from "@/api/hooks"
import { Description } from "@/components/Description/Description"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

/** Which case a form is about: its address and its id, under a heading. */
const CaseSummary: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useCase(id)
  const { street_name, number, suffix_letter, suffix, postal_code } =
    data?.address ?? {}
  const houseNumber = [number, suffix_letter, suffix].filter(Boolean).join("-")

  return (
    <Column gap="small">
      <Heading level={2}>Zaakgegevens</Heading>
      <Description
        termsWidth="narrow"
        loading={isLoading}
        numLoadingRows={2}
        data={[
          {
            label: "Adres",
            value: data
              ? `${street_name} ${houseNumber}, ${postal_code} Amsterdam`
              : undefined,
          },
          { label: "Zaak ID", value: data?.id },
        ]}
      />
    </Column>
  )
}

export default CaseSummary
