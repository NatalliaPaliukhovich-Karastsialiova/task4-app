import FloatingInput from './FloatingInput';

export default function RegisterForm({
  formData,
  handleChange,
  handleSubmit,
  error,
  setError,
  showPassword,
  setShowPassword,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <FloatingInput
          id="email"
          label="E-mail"
          type="email"
          icon="bi-envelope-fill"
          value={formData.email}
          required={true}
          onChange={e => {
            handleChange(e);
            setError('');
          }}
        />
      </div>

      <div className="mb-4"></div>

      <div className="mb-4 d-flex gap-2 w-100">
        <FloatingInput
          id="firstName"
          label="First Name"
          type="text"
          icon="bi-person-circle"
          value={formData.firstName}
          required={true}
          onChange={e => {
            handleChange(e);
            setError('');
          }}
        />
        <FloatingInput
          id="lastName"
          label="Last Name"
          type="text"
          icon="bi-person-circle"
          value={formData.lastName}
          required={true}
          onChange={e => {
            handleChange(e);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <FloatingInput
          id="companyName"
          label="Company Name"
          type="text"
          icon="bi-building-fill"
          value={formData.companyName}
          onChange={e => {
            handleChange(e);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <FloatingInput
          id="jobTitle"
          label="Job Title"
          type="text"
          icon="bi-person-workspace"
          value={formData.jobTitle}
          onChange={e => {
            handleChange(e);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <FloatingInput
          id="password"
          label="Password"
          value={formData.password}
          required={true}
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}
          onIconClick={() => setShowPassword(prev => !prev)}
          onChange={e => {
            handleChange(e);
            setError('');
          }}
        />
      </div>

      <div className="mb-4">
        <FloatingInput
          id="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          required={true}
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}
          onIconClick={() => setShowPassword(prev => !prev)}
          onChange={e => {
            handleChange(e);
            setError('');
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-100">
        Register
      </button>
    </form>
  );
}
