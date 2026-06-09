import ConfirmModal from "app/components/shared/Modal/ConfirmModal";
import { useUserById } from "./hooks/useUserById";

type Props = {
  pendingUserId: string | null;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmReassignDialog: React.FC<Props> = ({
  pendingUserId,
  onConfirm,
  onCancel,
}) => {
  const [pendingUser] = useUserById(pendingUserId ?? undefined);

  const name = pendingUser
    ? `${pendingUser.first_name} ${pendingUser.last_name}`.trim()
    : "de geselecteerde medewerker";

  return (
    <ConfirmModal
      isOpen={true}
      title="Toewijzing wijzigen"
      onClose={onCancel}
      onConfirm={() => Promise.resolve(onConfirm())}
      okValue="Ja, toewijzen"
      cancelValue="Annuleren"
    >
      Deze taak is al aan iemand toegewezen. Weet je zeker dat je de taak wilt
      toewijzen aan <strong>{name}</strong>?
    </ConfirmModal>
  );
};

export default ConfirmReassignDialog;
