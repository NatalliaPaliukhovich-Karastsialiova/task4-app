import UserRow from './UserRow';
import { useMediaQuery } from 'react-responsive';

export default function UserTable({ users, selected, onSelect, onSelectAll }) {
  const isTablet = useMediaQuery({ maxWidth: 1000 });
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const allSelected =
    users.length > 0 && users.every(u => selected.includes(u.email));

  return (
    <div className="table-responsive mt-4">
      <table className="table table-hover align-middle fs-5">
        <thead>
          <tr>
            <th scope="col" className="w-5 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={e => onSelectAll(e.target.checked, users)}
              />
            </th>

            {!isTablet && !isMobile && (
              <>
                <th scope="col" className="w-30 py-3">
                  Name
                </th>
                <th scope="col" className="py-3">
                  Email
                </th>
                <th scope="col" className="py-3">
                  Last Seen
                </th>
              </>
            )}
            {isTablet && !isMobile && (
              <>
                <th scope="col" className="w-50 py-3">
                  Name
                </th>
                <th scope="col" className="py-3">
                  Last Seen
                </th>
              </>
            )}
            {isMobile && (
              <th scope="col" className="w-100 py-3">
                Name
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow
              key={user.id}
              user={user}
              selected={selected.includes(user.email)}
              onSelect={() => onSelect(user.email)}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
