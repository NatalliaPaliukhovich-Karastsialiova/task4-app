export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="col-12 col-xl-6 align-self-center">
      <h4 className="mb-2 text-muted">{subtitle}</h4>
      <h2 className="mb-4">{title}</h2>
    </div>
  );
}
