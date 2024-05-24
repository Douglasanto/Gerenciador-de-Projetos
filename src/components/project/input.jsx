import "../../index.css";

function Input({ type, value, placeholder, name, text, handleOnChange }) {
  return (
    <div className="form_input">
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}

export default Input;
