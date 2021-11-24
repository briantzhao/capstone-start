export default function ({ label, name, type, value, onChange, valid }) {
  return (
    <label className="input__label">
      {label}
      <input
        className={valid ? "input__field" : "input__field input__field--error"}
        type={type}
        placeholder={label}
        name={name}
        onChange={onChange}
        value={value}
      ></input>
      {valid !== null ? (
        !valid && <p className="input__error">This field is required</p>
      ) : (
        <></>
      )}
    </label>
  );
}
