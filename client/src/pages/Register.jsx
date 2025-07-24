import './style.css';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import AuthAlert from '../components/AuthAlert';
import RegisterForm from '../components/RegisterForm';
import { useLoader } from '../context/LoaderContext';

export default function Register() {

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    jobTitle: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/v1/auth/web/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          job_title: formData.jobTitle,
          company_name: formData.companyName
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      navigate('/login');
      toast.success(`User created successfully!`);
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
          title="Sign Up in The App"
          subtitle="Start your journey"
        />
        <AuthAlert message={error} />
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          setError={setError}
        />
      </div>
      <p className="mt-4 text-muted">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  )
}
