import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { ErrorMessage } from "formik";
import styles from "./selectField.module.css";
const SelectField = (props) => {
  const { field, form, options, label, placeholder, disabled } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const selectedOption = options.find((option) => option.value === value);

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <>
      {label && <label for={name}>{label}</label>}
      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: showError ? "red" : "#777",
            color: "#777",
            fontSize: "16px",
          }),
        }}
      />
      <ErrorMessage name={name} component="p" className={styles.errors} />
    </>
  );
};

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};
SelectField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
};
export default SelectField;
