import './style.css';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import LoginForm from '../components/LoginForm';
import AuthAlert from '../components/AuthAlert';
import { useLoader } from '../context/LoaderContext';
import { loginUser } from '../services/api';
import {
  saveRememberedCredentials,
  clearRememberedCredentials,
  getRememberedCredentials,
} from '../utils/authStorage';

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const remembered = getRememberedCredentials();
  const [email, setEmail] = useState(remembered.email);
  const [password, setPassword] = useState(remembered.password);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(!!remembered.email);
  const { setLoading } = useLoader();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();

    remember
      ? saveRememberedCredentials(email, password)
      : clearRememberedCredentials();

    try {
      setLoading(true);

      const res = await loginUser({ email: email, password });

      setLoading(false);

      if (!res.ok) {
        setError(res.data.error || 'Login failed');
        return;
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.user.email);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error('Server error');
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-primary fw-bold mb-4">THE APP</h1>
      <div className="col-12 col-xl-9 align-self-center">
        <AuthHeader title="Sign In to The App" subtitle="Start your journey" />
        <AuthAlert message={error} />
        <LoginForm
          onSubmit={handleLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          setError={setError}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          remember={remember}
          setRemember={setRemember}
        />
      </div>
      <p className="mt-4 text-muted">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
