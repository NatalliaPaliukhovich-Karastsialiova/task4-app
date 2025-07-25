import { Form } from 'react-bootstrap';

const FloatingInput = ({
  label,
  type,
  icon,
  value,
  onChange,
  id,
  onIconClick,
  required = false,
}) => {
  return (
    <div className="position-relative w-100">
      <Form.Floating>
        <Form.Control
          id={id}
          name={id}
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
          required={required}
          className="fw-semibold border-2 fs-5"
        />
        <label htmlFor={id}>{label}</label>
      </Form.Floating>
      <i
        className={`bi ${icon} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
        style={{ cursor: onIconClick ? 'pointer' : 'default' }}
        onClick={onIconClick}
      ></i>
    </div>
  );
};

export default FloatingInput;
