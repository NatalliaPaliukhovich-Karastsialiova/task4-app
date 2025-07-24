import './style.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import TableToolbar from '../components/TableToolbar';
import { useLoader } from '../context/LoaderContext';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filterText, setFilterText] = useState('');
  const { setLoading } = useLoader();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch users');
      }
      return res.json();
    })
    .then((data) => {
      setUsers(data.data);
      setLoading(false);
    })
    .catch((err) => setError(err.message));
  }, []);

  const handleBatchAction = async (action) => {
    const token = localStorage.getItem('token');
    const currentUserEmail = localStorage.getItem('email');

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          emails: selected,
          action
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      const updatedUsers = users.map(u => {
        if (!selected.includes(u.email)) return u;
        if (action === 'block') return { ...u, status: 'blocked' };
        if (action === 'unblock') return { ...u, status: 'active' };
        return null;
      }).filter(Boolean);

      setUsers(updatedUsers);
      setSelected([]);
      setLoading(false);
      toast.success(`Users ${action}ed successfully!`);

      if(selected.includes(currentUserEmail) &&
        (action === 'block' || action === 'deleted')) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login');
      }

    } catch (err) {
      alert(err.message);
    }
  };


  const handleSelect = (email) => {
    setSelected(prev => prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);
  };

  const handleSelectAll = (checked, visibleUsers) => {
    setSelected(checked ? visibleUsers.map(u => u.email) : []);
    let i = 0;
  };

  const handleFilterChange = (text) => {
    setFilterText(text.toLowerCase());
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(filterText) ||
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
