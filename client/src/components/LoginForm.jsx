import FloatingInput from './FloatingInput';

export default function LoginForm({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  showPassword,
  setShowPassword,
  remember,
  setRemember,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <FloatingInput
          id="email"
          label="E-mail"
          type="email"
          icon="bi-envelope-fill"
          value={email}
          required={true}
          onChange={e => {
            setEmail(e.target.value);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <FloatingInput
          id="password"
          label="Password"
          required={true}
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError('');
          }}
          onIconClick={() => setShowPassword(prev => !prev)}
        />
      </div>

      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="remember"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="remember">
          Remember me
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-100">
        Sign In
      </button>
    </form>
  );
}
