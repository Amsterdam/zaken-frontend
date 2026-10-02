import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useAssignTask, useUsersMe } from "@/api/hooks";
import useHasPermission, {
  CAN_PERFORM_TASK,
} from "@/hooks/useHasPermission";
import AssigneeAvatar from "./AssigneeAvatar";
import UserPickerDropdown from "./UserPickerDropdown";
import ConfirmReassignDialog from "./ConfirmReassignDialog";
import styles from "./AssignTask.module.css";

type Props = {
  taskId: Tasks.TaskId;
  taskOwner?: string | null;
};

const AssignTask: React.FC<Props> = ({ taskId, taskOwner }) => {
  const [hasPerformTaskPermission] = useHasPermission([CAN_PERFORM_TASK]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    transform: string;
  } | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null | undefined>(
    undefined,
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: currentUser, isLoading: isMeBusy } = useUsersMe();
  // Updates the owner wherever the task is shown: the overview and the case page.
  const { mutate: assignTask, isPending } = useAssignTask(taskId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideContainer = containerRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideContainer && !insideDropdown) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyOwnerChange = (newOwner: string | null) => {
    setDropdownOpen(false);
    assignTask(newOwner);
  };

  const handleUserSelect = (userId: string | null) => {
    if (userId === null) {
      applyOwnerChange(null);
      return;
    }
    if (userId === taskOwner) {
      setDropdownOpen(false);
      return;
    }
    if (taskOwner && taskOwner !== userId) {
      setPendingUserId(userId);
      setConfirmOpen(true);
      setDropdownOpen(false);
      return;
    }
    applyOwnerChange(userId);
  };

  const handleConfirmReassign = () => {
    if (pendingUserId !== undefined) {
      applyOwnerChange(pendingUserId);
    }
    setConfirmOpen(false);
    setPendingUserId(undefined);
  };

  const handleCancelReassign = () => {
    setConfirmOpen(false);
    setPendingUserId(undefined);
  };

  const handleAvatarClick = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const dropdownWidth = 240;
    const dropdownHeight = 380; // geschatte max hoogte
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontale positie — relatief aan viewport (fixed)
    const centerX = rect.left + rect.width / 2;
    const wouldOverflowLeft = centerX - dropdownWidth / 2 < 8;
    const wouldOverflowRight = centerX + dropdownWidth / 2 > viewportWidth - 8;

    let left: number;
    let transform: string;
    if (wouldOverflowLeft) {
      left = rect.left;
      transform = "none";
    } else if (wouldOverflowRight) {
      left = rect.right - dropdownWidth;
      transform = "none";
    } else {
      left = centerX;
      transform = "translateX(-50%)";
    }

    // Verticale positie — open boven de avatar als er onvoldoende ruimte onder is
    const wouldOverflowBottom =
      rect.bottom + dropdownHeight > viewportHeight - 8;
    const top = wouldOverflowBottom
      ? rect.top - dropdownHeight - 6 // boven de avatar
      : rect.bottom + 6; // onder de avatar

    setDropdownPos({ top, left, transform });
    setDropdownOpen((prev) => !prev);
  };

  if (!hasPerformTaskPermission) {
    return <span className={styles.noPermission}>-</span>;
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <AssigneeAvatar
        taskOwner={taskOwner ?? null}
        currentUserId={currentUser?.id ?? null}
        currentUser={currentUser ?? null}
        isBusy={isMeBusy || isPending}
        onClick={handleAvatarClick}
      />

      {dropdownOpen &&
        dropdownPos &&
        createPortal(
          <UserPickerDropdown
            currentUserId={currentUser?.id ?? null}
            currentOwnerId={taskOwner ?? null}
            onSelect={handleUserSelect}
            onClose={() => setDropdownOpen(false)}
            positionTop={dropdownPos.top}
            positionLeft={dropdownPos.left}
            positionTransform={dropdownPos.transform}
            dropdownRef={dropdownRef}
          />,
          document.body,
        )}

      {confirmOpen && (
        <ConfirmReassignDialog
          pendingUserId={pendingUserId ?? null}
          onConfirm={handleConfirmReassign}
          onCancel={handleCancelReassign}
        />
      )}
    </div>
  );
};

export default AssignTask;
