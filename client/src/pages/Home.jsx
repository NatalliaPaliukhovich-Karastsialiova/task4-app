import './style.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import TableToolbar from '../components/TableToolbar';
import { useLoader } from '../context/LoaderContext';
import { fetchUsers, batchUsersUpdate } from '../services/api';
import { clearTokenDueLogOut } from '../utils/authStorage';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filterText, setFilterText] = useState('');
  const { setLoading } = useLoader();

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      try {
        const res = await fetchUsers();

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            clearTokenDueLogOut();
            navigate('/login');
          }
          throw new Error(res.error || 'Failed to fetch users');
        }

        setUsers(res.data.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleBatchAction = async action => {
    try {
      setLoading(true);
      const res = await batchUsersUpdate({
        emails: selected,
        action,
      });

      if (!res.ok) throw new Error(res.error || 'Failed to update users');

      const updatedUsers = users
        .map(u => {
          if (!selected.includes(u.email)) return u;
          if (action === 'block') return { ...u, status: 'blocked' };
          if (action === 'unblock') return { ...u, status: 'active' };
          return null;
        })
        .filter(Boolean);

      setUsers(updatedUsers);
      setSelected([]);

      if (action === 'block' || action === 'unblock')
        toast.success(`Users ${action}ed successfully!`);
      else if (action === 'delete')
        toast.success(`Users deleted successfully!`);

      const currentUserEmail = localStorage.getItem('email');

      if (
        selected.includes(currentUserEmail) &&
        (action === 'block' || action === 'deleted')
      ) {
        clearTokenDueLogOut();
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = email => {
    setSelected(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleSelectAll = (checked, visibleUsers) => {
    setSelected(checked ? visibleUsers.map(u => u.email) : []);
    let i = 0;
  };

  const handleFilterChange = text => {
    setFilterText(text.toLowerCase());
  };

  const filteredUsers = users.filter(
    user =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(filterText) ||
      user.email.toLowerCase().includes(filterText) ||
      (user.status || '').toLowerCase().includes(filterText)
  );

  return (
    <div>
      <Navbar />
      <div className="container-fluid ps-1 pe-1 pt-3 ps-md-5 pe-md-5">
        <h2 className="ms-2">User Management</h2>
        <TableToolbar
          selectedCount={selected.length}
          onFilterChange={handleFilterChange}
          onAction={handleBatchAction}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
        <UserTable
          users={filteredUsers}
          selected={selected}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
}
