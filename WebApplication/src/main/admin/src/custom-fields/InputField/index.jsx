import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import styles from "./inputField.module.css";
InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isdate: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

function InputField(props) {
  const { field, type, form, label, placeholder, disabled, isdate, className } = props;
  const { name } = field;
  const showError = form.errors[name] && form.touched[name];
  return (
    <>
      {label && <label for={name}>{label}</label>}

      <input
        id={name}
        name={name}
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        isdate="false"
        className={showError ? styles.isInvalid : ""}
        className={className}
        onFocus={isdate ? (e) => (e.target.type = "date") : null}
      />
      <ErrorMessage name={name} component="p" className={styles.errors} />
    </>
  );
}

export default InputField;
