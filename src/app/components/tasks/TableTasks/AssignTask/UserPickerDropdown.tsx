import { useState, useEffect, useRef } from "react";
import { useUsers } from "app/state/rest";
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers";
import styles from "./UserPickerDropdown.module.css";

type User = Pick<
  Components.Schemas.User,
  "id" | "first_name" | "last_name" | "full_name"
>;

type Props = {
  currentUserId: string | null;
  currentOwnerId: string | null;
  onSelect: (userId: string | null) => void;
  onClose: () => void;
};

const UserPickerDropdown: React.FC<Props> = ({
  currentUserId,
  currentOwnerId,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [data, { isBusy }] = useUsers();
  const users: User[] = (data?.results ?? []).filter(
    (u) => u.first_name && u.last_name,
  );
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filtered: User[] = users.filter((u: User) => {
    if (!search.trim()) return true;
    const full = `${u.first_name} ${u.last_name}`.toLowerCase();
    return full.includes(search.toLowerCase());
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className={styles.dropdown}
      role="listbox"
      aria-label="Medewerker selecteren"
      onKeyDown={handleKeyDown}
    >
      {/* Search field */}
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={searchRef}
          className={styles.searchInput}
          type="text"
          placeholder="Medewerker zoeken…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Zoek medewerker"
        />
      </div>

      <ul className={styles.list} role="group">
        {/* Unassign option */}
        <li
          className={`${styles.item} ${styles.unassignItem} ${!currentOwnerId ? styles.itemDisabled : ""}`}
          role="option"
          aria-selected={!currentOwnerId}
          onClick={() => !currentOwnerId || onSelect(null)}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(null)}
        >
          <span className={styles.unassignAvatar} aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              <line
                x1="22"
                y1="2"
                x2="2"
                y2="22"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          <span className={styles.itemName}>Niet toegewezen</span>
          {!currentOwnerId && (
            <span className={styles.currentBadge}>huidig</span>
          )}
        </li>

        {/* Self-assign shortcut */}
        {currentUserId && (
          <li
            className={styles.item}
            role="option"
            aria-selected={currentOwnerId === currentUserId}
            onClick={() => onSelect(currentUserId)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(currentUserId)}
          >
            <span className={styles.selfIcon} aria-hidden="true">
              ★
            </span>
            <span className={styles.itemName}>Toewijzen aan mijzelf</span>
            {currentOwnerId === currentUserId && (
              <span className={styles.currentBadge}>huidig</span>
            )}
          </li>
        )}
      </ul>

      <div className={styles.divider} aria-hidden="true" />

      {/* User list */}
      <ul className={styles.list} role="group" aria-label="Medewerkers">
        {isBusy && <li className={styles.statusItem}>Laden…</li>}
        {!isBusy && filtered.length === 0 && (
          <li className={styles.statusItem}>Geen medewerkers gevonden</li>
        )}
        {filtered.map((user: User) => {
          const isSelected = user.id === currentOwnerId;
          const initials = createNameAbbreviation(user);
          return (
            <li
              key={user.id}
              className={`${styles.item} ${isSelected ? styles.itemActive : ""}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(user.id ?? null)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect(user.id ?? null)}
            >
              <span className={styles.userInitials} aria-hidden="true">
                {initials}
              </span>
              <span className={styles.itemName}>
                {user.first_name} {user.last_name}
              </span>
              {isSelected && (
                <svg
                  className={styles.checkmark}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserPickerDropdown;
