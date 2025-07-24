export default function AuthLayout({ children }) {
  return (
    <div className="d-flex min-vh-100">
      <div className="w-100 p-5 d-flex flex-column justify-content-between">
        {children}
      </div>
      <div className="col-md-6 login-right-bg d-none d-md-block"></div>
    </div>
  );
}
