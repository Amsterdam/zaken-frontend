import { useForm } from "react-hook-form"
import { SelectControl } from "@amsterdam/ee-ads-rhf"
import { useSetCaseData, useUpdateAddress } from "@/api/hooks"
import { FormDialog } from "@/components/FormDialog/FormDialog"
import { useToast } from "@/components/toasts/useToast"

type Corporation = components["schemas"]["HousingCorporation"]

type Props = {
  housingCorporations: Corporation[]
  housingCorporationId?: Corporation["id"] | null
  bagId: components["schemas"]["Address"]["bag_id"]
  caseId: components["schemas"]["Case"]["id"]
  onClose: () => void
}

type FormValues = { corporation: string }

// The address has a housing corporation or none.
const NO_CORPORATION = "none"

/**
 * Changes the housing corporation of the address of a case, in a dialog.
 * Render it while it is open.
 */
const ChangeHousingCorporationDialog: React.FC<Props> = ({
  housingCorporations,
  housingCorporationId,
  bagId,
  caseId,
  onClose,
}) => {
  const setCaseData = useSetCaseData(caseId)
  const { mutateAsync: updateAddress, isPending } = useUpdateAddress(bagId)
  const { showToast } = useToast()
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      corporation:
        housingCorporationId != null
          ? String(housingCorporationId)
          : NO_CORPORATION,
    },
  })

  const onSubmit = async ({ corporation }: FormValues) => {
    const housing_corporation =
      corporation === NO_CORPORATION ? null : Number(corporation)
    // Nothing changed: nothing to save.
    if (housing_corporation === (housingCorporationId ?? null)) {
      onClose()
      return
    }
    try {
      const address = await updateAddress({ housing_corporation })
      // Show the new housing corporation on the case right away.
      setCaseData((caseItem) => ({
        ...caseItem,
        address: {
          ...caseItem.address,
          housing_corporation: address.housing_corporation,
        },
      }))
    } catch {
      // The error is shown as a message at the top of the page; the dialog stays.
      return
    }
    const name = housingCorporations.find(
      ({ id }) => id === housing_corporation,
    )?.name
    showToast({
      severity: "success",
      title: name ? "Corporatie gewijzigd" : "Corporatie verwijderd",
      description: name ? (
        <>
          Het adres is toegewezen aan <strong>{name}</strong>.
        </>
      ) : (
        "Het adres is niet meer gekoppeld aan een corporatie."
      ),
    })
    onClose()
  }

  return (
    <FormDialog
      heading="Corporatie wijzigen"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      onClose={onClose}
    >
      <SelectControl<FormValues>
        name="corporation"
        label="Welke woningcorporatie hoort bij dit adres?"
        options={[
          { label: "Geen corporatie", value: NO_CORPORATION },
          ...housingCorporations.map(({ id, name }) => ({
            label: name,
            value: String(id),
          })),
        ]}
        registerOptions={{ required: "Kies een corporatie." }}
        // The dialog has its own heading: the question is no second one.
        inFieldSet
      />
    </FormDialog>
  )
}

export default ChangeHousingCorporationDialog
