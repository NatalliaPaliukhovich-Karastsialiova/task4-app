import { useState } from 'react';

export default function LoginForm({ onSubmit, email, setEmail, password, setPassword, error, setError }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="form-label">E-mail</label>
        <input
          type="email"
          className="form-control form-control-lg"
          id="email"
          placeholder="test@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control form-control-lg"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />
      </div>

      <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" id="remember" />
        <label className="form-check-label" htmlFor="remember">Remember me</label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-100">
        Sign In
      </button>
    </form>
  );
}
