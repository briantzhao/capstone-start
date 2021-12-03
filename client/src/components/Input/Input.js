import "./Input.scss";

//valid prop is a boolean that applies different classes to input element
//also renders error message if true
export default function Input({
  label,
  name,
  type,
  value,
  onChange,
  valid,
  checked,
}) {
  return (
    <label className="input__label">
      {label}
      {/* checked is passed for radio buttons
      sets status to checked by default if true */}
      {checked ? (
        <input
          className={
            valid ? "input__field" : "input__field input__field--error"
          }
          type={type}
          placeholder={label}
          name={name}
          onChange={onChange}
          value={value}
          checked
        ></input>
      ) : (
        <input
          className={
            valid ? "input__field" : "input__field input__field--error"
          }
          type={type}
          placeholder={label}
          name={name}
          onChange={onChange}
          value={value}
        ></input>
      )}
      {valid !== null ? (
        !valid && <p className="input__error">This field is required</p>
      ) : (
        <></>
      )}
    </label>
  );
}
