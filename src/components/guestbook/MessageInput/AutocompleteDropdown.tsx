import { AutocompleteUser } from "./types";

interface AutocompleteDropdownProps {
  show: boolean;
  users: AutocompleteUser[];
  cursor: number;
  onSelectUser: (user: AutocompleteUser) => void;
}

export function AutocompleteDropdown({
  show,
  users,
  cursor,
  onSelectUser,
}: AutocompleteDropdownProps) {
  if (!show || users.length === 0) return null;

  return (
    <ul className="absolute z-10 bg-primary-light dark:bg-primary-dark border border-gray-100 dark:border-primary-gray rounded sm:w-72 max-w-full bottom-full mb-2 left-0">
      {users.map((user, i) => (
        <li
          key={user.id}
          className={`rounded px-3 sm:px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/50 text-sm ${
            i === cursor ? "bg-gray-100 dark:bg-white/50" : ""
          }`}
          onClick={() => onSelectUser(user)}
        >
          @{user.name}
        </li>
      ))}
    </ul>
  );
}
