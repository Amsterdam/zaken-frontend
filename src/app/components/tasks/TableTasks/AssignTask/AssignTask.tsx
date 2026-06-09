import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTask, useUsersMe } from "app/state/rest";
import useContextCache from "app/state/rest/provider/useContextCache";
import useHasPermission, {
  CAN_PERFORM_TASK,
  SENSITIVE_CASE_PERMISSION,
} from "app/state/rest/custom/usePermissions/useHasPermission";
import { ContextValues } from "app/state/context/ValueProvider";
import { getQueryUrl } from "app/state/rest/tasks";
import AssigneeAvatar from "./AssigneeAvatar";
import UserPickerDropdown from "./UserPickerDropdown";
import ConfirmReassignDialog from "./ConfirmReassignDialog";
import styles from "./AssignTask.module.css";

type Props = {
  taskId: any;
  taskOwner?: string | null;
  isEnforcement: boolean;
  onOwnerChange?: (taskId: any, newOwner: string | null) => void;
};

const enforcementPagination = {
  page: 1,
  pageSize: 1000,
};

const AssignTask: React.FC<Props> = ({
  taskId,
  taskOwner,
  isEnforcement,
  onOwnerChange,
}) => {
  const {
    pagination,
    sorting,
    role,
    theme,
    owners,
    projects,
    subjects,
    tags,
    taskNames,
    reason,
    districtNames,
    housingCorporations,
    housingCorporationIsNull,
  } = useContext(ContextValues)["tasks"];

  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION]);
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
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [currentUser, { isBusy: isMeBusy }] = useUsersMe();
  const [, { execPatch }] = useTask(taskId);

  const queryUrl = getQueryUrl(
    hasPermission,
    isEnforcement ? enforcementPagination : pagination,
    sorting,
    theme,
    role,
    owners,
    isEnforcement,
    taskNames,
    projects,
    reason,
    subjects,
    tags,
    districtNames,
    housingCorporations,
    housingCorporationIsNull,
  );

  const { getContextItem, updateContextItem } = useContextCache(
    "cases",
    queryUrl,
  );

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

  const applyOwnerChange = useCallback(
    async (newOwner: string | null) => {
      setLoading(true);
      setDropdownOpen(false);
      try {
        const resp: any = await execPatch({ owner: newOwner });
        if (resp?.status === 200) {
          if (onOwnerChange) {
            onOwnerChange(taskId, newOwner);
          } else {
            const tasksResponse = getContextItem();
            const tasks = tasksResponse?.results ?? [];
            const newTasks = [...tasks];
            const index = newTasks.findIndex(
              (task: { id: number }) => task.id === taskId,
            );
            if (index !== -1) {
              newTasks[index] = { ...newTasks[index], owner: newOwner };
            }
            updateContextItem({ ...tasksResponse, results: newTasks });
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [execPatch, getContextItem, updateContextItem, taskId, onOwnerChange],
  );

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
        isBusy={isMeBusy || loading}
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
