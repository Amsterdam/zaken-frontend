import { useForm, useWatch } from "react-hook-form"
import { useCase, useCreateCitizenReport } from "@/api/hooks"
import { CaseFormPage } from "@/components/case/CaseFormPage/CaseFormPage"
import { EXCLUDED_THEMES_ADVERTISEMENTS } from "@/shared/constants/themeNames"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"
import { AdvertisementFields } from "./AdvertisementFields"
import { ReportFields } from "./ReportFields"
import {
  type AdvertisementValues,
  controlOf,
  emptyAdvertisementValues,
  emptyReportValues,
  type ReportValues,
  toAdvertisements,
  toCitizenReport,
  YES,
} from "./reportValues"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type FormValues = ReportValues & AdvertisementValues

/** The page to process a report of a citizen (a SIG report) on a case. */
const CitizenReportForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const themeName = caseItem?.theme.name
  const { mutateAsync: createCitizenReport, isPending } =
    useCreateCitizenReport(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: { ...emptyReportValues, ...emptyAdvertisementValues },
  })
  const advertisement = useWatch({
    control: form.control,
    name: "advertisement",
  })
  // Some themes have no advertisements.
  const asksAdvertisement =
    themeName !== undefined &&
    !EXCLUDED_THEMES_ADVERTISEMENTS.includes(themeName)
  const hasAdvertisement = asksAdvertisement && advertisement === YES

  const onSubmit = async (values: FormValues) => {
    try {
      await createCitizenReport({
        case: id,
        case_user_task_id: caseUserTaskId,
        ...toCitizenReport(values),
        ...(hasAdvertisement && { advertisements: toAdvertisements(values) }),
      })
    } catch {
      // The error is shown as a toast; the form stays.
      return
    }
    afterSubmit()
  }

  return (
    <CaseFormPage
      id={id}
      title="Melding verwerken"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    >
      <ReportFields
        control={controlOf(form.control)}
        asksNuisance={themeName === "Vakantieverhuur"}
      />
      {asksAdvertisement && (
        <AdvertisementFields control={controlOf(form.control)} />
      )}
    </CaseFormPage>
  )
}

export default CitizenReportForm
