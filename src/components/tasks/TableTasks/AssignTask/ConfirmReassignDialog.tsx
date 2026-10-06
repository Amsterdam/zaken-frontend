import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog"
import { useUserById } from "./hooks/useUserById"

type Props = {
  pendingUserId: string | null
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmReassignDialog: React.FC<Props> = ({
  pendingUserId,
  onConfirm,
  onCancel,
}) => {
  const [pendingUser] = useUserById(pendingUserId ?? undefined)

  const name = pendingUser
    ? `${pendingUser.first_name} ${pendingUser.last_name}`.trim()
    : "de geselecteerde medewerker"

  return (
    <ConfirmDialog
      title="Toewijzing wijzigen"
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmText="Ja, toewijzen"
    >
      Deze taak is al aan iemand toegewezen. Weet je zeker dat je de taak wilt
      toewijzen aan <strong>{name}</strong>?
    </ConfirmDialog>
  )
}

export default ConfirmReassignDialog
