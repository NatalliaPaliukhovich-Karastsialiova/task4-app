import './style.css';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import LoginForm from '../components/LoginForm';
import AuthAlert from '../components/AuthAlert';
import { useLoader } from '../context/LoaderContext';

export default function Login() {

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setLoading } = useLoader();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/auth/web/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password }),
      });

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      navigate('/home');

    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-primary fw-bold mb-4">THE APP</h1>
      <div className="col-12 col-xl-9 align-self-center">
      <AuthHeader
        title="Sign In to The App"
        subtitle="Start your journey"
      />
      <AuthAlert message={error} />
      <LoginForm
        onSubmit={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        setError={setError}
      />
      </div>
      <p className="mt-4 text-muted">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
