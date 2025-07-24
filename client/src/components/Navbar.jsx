import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar bg-primary px-4 d-flex justify-content-between">
      <h4 className="navbar-brand text-white">Admin Panel</h4>
      <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
    </nav>
  );
}
