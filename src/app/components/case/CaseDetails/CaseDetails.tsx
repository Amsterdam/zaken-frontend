import { useCase } from "@/api/hooks"
import { Description } from "@/components/Description/Description"
import { EqualColumns } from "@/components/EqualColumns/EqualColumns"
import { formatDate } from "@/shared/dateFormatters"
import caseStates from "@/app/constants/caseStates"
import ChangeHousingCorporation from "./ChangeHousingCorporation/ChangeHousingCorporation"
import ChangeableSubject from "./ChangeSubject/ChangeableSubject"
import EditableTag from "./EditableTag/EditableTag"

type Props = {
  caseId: components["schemas"]["CaseCreate"]["id"]
}

/**
 * The facts of a case in two columns. The subjects, the tag and the housing
 * corporation can be changed here.
 */
const CaseDetails: React.FC<Props> = ({ caseId }) => {
  const { data: caseItem, isLoading } = useCase(caseId)
  const hasProject = caseItem?.project?.name !== undefined

  return (
    <EqualColumns gap="large">
      <Description
        termsWidth="medium"
        dense
        loading={isLoading}
        numLoadingRows={4}
        data={
          caseItem
            ? [
                {
                  label: "Zaak ID",
                  value: caseItem.id,
                },
                { label: "Status", value: caseStates[caseItem.state] },
                {
                  label: "Startdatum",
                  value: formatDate(caseItem.start_date, undefined, "-"),
                },
                // Only for a case that was handed over.
                {
                  label: "Overgedragen zaak",
                  value: caseItem.previous_case || undefined,
                },
                { label: "Tag", value: <EditableTag case={caseItem} /> },
              ]
            : []
        }
      />
      <Description
        termsWidth="medium"
        dense
        loading={isLoading}
        numLoadingRows={4}
        data={
          caseItem
            ? [
                { label: "Thema", value: caseItem.theme.name },
                {
                  label: "Aanleiding",
                  value: `${caseItem.reason.name}${hasProject ? `: ${caseItem.project.name}` : ""}`,
                },
                {
                  label: "Onderwerp(en)",
                  value: (
                    <ChangeableSubject
                      subjects={caseItem.subjects}
                      caseId={caseItem.id}
                      themeId={caseItem.theme.id}
                    />
                  ),
                },
                {
                  label: "Corporatie",
                  value: (
                    <ChangeHousingCorporation
                      housingCorporationId={
                        caseItem.address?.housing_corporation
                      }
                      bagId={caseItem.address?.bag_id}
                      caseId={caseItem.id}
                    />
                  ),
                },
              ]
            : []
        }
      />
    </EqualColumns>
  )
}

export default CaseDetails
