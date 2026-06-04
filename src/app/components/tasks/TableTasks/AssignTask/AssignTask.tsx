import { useState, useEffect, useContext, useRef, useCallback } from "react";
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
};

const enforcementPagination = {
  page: 1,
  pageSize: 1000,
};

const AssignTask: React.FC<Props> = ({ taskId, taskOwner, isEnforcement }) => {
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
  const [pendingUserId, setPendingUserId] = useState<string | null | undefined>(
    undefined,
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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
      } finally {
        setLoading(false);
      }
    },
    [execPatch, getContextItem, updateContextItem, taskId],
  );

  /**
   * Called when the user picks someone from the dropdown.
   * If a *different* person already owns the task, ask for confirmation first.
   */
  const handleUserSelect = (userId: string | null) => {
    // Unassign: no confirmation needed
    if (userId === null) {
      applyOwnerChange(null);
      return;
    }
    // Same owner: no-op
    if (userId === taskOwner) {
      setDropdownOpen(false);
      return;
    }
    // Already owned by someone else → confirm
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
        onClick={() => setDropdownOpen((prev) => !prev)}
      />

      {dropdownOpen && (
        <UserPickerDropdown
          currentUserId={currentUser?.id ?? null}
          currentOwnerId={taskOwner ?? null}
          onSelect={handleUserSelect}
          onClose={() => setDropdownOpen(false)}
        />
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
