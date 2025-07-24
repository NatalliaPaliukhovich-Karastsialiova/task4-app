export default function RegisterForm({ formData, handleChange, handleSubmit, error, setError }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="email"
          className="form-control form-control-lg"
          id="email"
          name="email"
          placeholder="test@example.com"
          value={formData.email}
          onChange={(e) => {
            handleChange(e);
            setError('');
          }}
          required
        />
      </div>

      <div className="mb-4 d-flex gap-2">
        <input
          type="text"
          className="form-control form-control-lg"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => {
            handleChange(e);
            setError('');
          }}
          required
        />
        <input
          type="text"
          className="form-control form-control-lg"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => {
            handleChange(e);
            setError('');
          }}
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          name="companyName"
          placeholder="Test company"
          value={formData.companyName}
          onChange={(e) => {
            handleChange(e);
            setError('');
          }}
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          name="jobTitle"
          placeholder="Project Manager"
          value={formData.jobTitle}
          onChange={(e) => {
            handleChange(e);
            setError('');
          }}
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          className="form-control form-control-lg"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            handleChange(e);
            setError('');
          }}
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          className="form-control form-control-lg"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => {
            handleChange(e);
            setError('');
          }}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-100">
        Register
      </button>
    </form>
  );
}
