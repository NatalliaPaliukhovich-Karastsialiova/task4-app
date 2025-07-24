import UserRow from './UserRow';
import UserCard from './UserCard';
import { useMediaQuery } from 'react-responsive';

export default function UserTable({ users, selected, onSelect, onSelectAll }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const allSelected = users.length > 0 && users.every(u => selected.includes(u.email));

  if (isMobile) {
    return (
      <div className="table-responsive mt-4">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col" className="w-5"><input type="checkbox" /></th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
    );
  }

  return (
    <div className="table-responsive mt-4">
      <table className="table table-hover align-middle fs-5">
        <thead>
          <tr>
            <th scope="col" className="w-5 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked, users)}
              />
            </th>
            <th scope="col" className="w-30 py-3">Name</th>
            <th scope="col" className="py-3">Email</th>
            <th scope="col" className="w-10 py-3">Status</th>
            <th scope="col" className="py-3">Last Seen</th>
            <th scope="col" className="py-3">Created On</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              selected={selected.includes(user.email)}
              onSelect={() => onSelect(user.email)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
