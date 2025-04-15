import { useModal } from "app/components/shared/Modal/hooks/useModal"
import FormModal from "../FormModal/FormModal"
import { Button } from "@amsterdam/asc-ui"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"
import Hidden from "app/components/shared/Hidden/Hidden"

type Props = {
  onSubmit: (
    variables: Components.Schemas.GenericCompletedTask["variables"]
  ) => Promise<unknown>
  taskName: string
  caseId: Components.Schemas.CaseDetail["id"]
  form?: Components.Schemas.CaseUserTaskWorkdflow["form"]
  disabled?: boolean
}

const TaskButton: React.FC<Props> = ({
  onSubmit,
  taskName,
  caseId,
  form,
  disabled = false
}) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <CustomTooltip
          title={
            disabled ? "U heeft geen rechten om deze actie uit te voeren" : ""
          }
        >
          <Button
            variant="textButton"
            as="button"
            disabled={disabled}
            iconLeft={<CustomIcon name="ChevronRight" />}
            onClick={openModal}
          >
            <Hidden maxBreakpoint="laptopM">
              <span>Taak afronden</span>
            </Hidden>
          </Button>
        </CustomTooltip>
      </div>
      <FormModal
        taskName={taskName}
        caseId={caseId}
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        closeModal={closeModal}
        form={form}
      />
    </>
  )
}

export default TaskButton
