import { Spinner } from "@amsterdam/asc-ui";
import styles from "./AssigneeAvatar.module.css";
import { useUserById } from "./hooks/useUserById";
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers";

type Props = {
  taskOwner: string | null;
  currentUser: Components.Schemas.User | null;
  currentUserId: string | null;
  isBusy: boolean;
  onClick: () => void;
};

const AssigneeAvatar: React.FC<Props> = ({
  taskOwner,
  currentUser,
  currentUserId,
  isBusy,
  onClick,
}) => {
  // Fetch the assigned user's profile when there is an owner.
  const [assignedUser, { isBusy: isUserBusy }] = useUserById(
    taskOwner ?? undefined,
  );

  if (isBusy || isUserBusy) {
    return (
      <span className={styles.spinnerWrapper}>
        <Spinner />
      </span>
    );
  }

  const isUnassigned = !taskOwner;
  const isOwnTask = taskOwner === currentUserId;
  const resolvedUser = assignedUser ?? (isOwnTask ? currentUser : null);

  const tooltipLabel = isUnassigned
    ? "Niet toegewezen – klik om toe te wijzen"
    : isOwnTask
      ? "Mijn taak – klik om te wijzigen"
      : `Toegewezen aan ${assignedUser?.first_name ?? ""} ${assignedUser?.last_name ?? ""}`.trim() +
        " – klik om te wijzigen";

  return (
    <button
      type="button"
      className={`${styles.avatarButton} ${isUnassigned ? styles.unassigned : styles.assigned} ${isOwnTask ? styles.ownTask : ""}`}
      onClick={onClick}
      title={tooltipLabel}
      aria-label={tooltipLabel}
      aria-haspopup="listbox"
    >
      {isUnassigned ? (
        /* Grey placeholder */
        <span className={styles.placeholder} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </span>
      ) : (
        /* Initials */
        <span className={styles.initials} aria-hidden="true">
          {resolvedUser
            ? createNameAbbreviation(resolvedUser)
            : taskOwner?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </button>
  );
};

export default AssigneeAvatar;
