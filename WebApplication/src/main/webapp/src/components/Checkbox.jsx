import React, { useRef } from "react";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  const inputRef = useRef(null);
  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };

  return (
    <label className="custom-checkbox">
        <input
            type="radio"
            name={props.name}
            onClick={props.onClick}
            checked={props.checked}
            ref={inputRef}
            onChange={onChange}
        />
      <span className="custom-checkbox__checkmark">
        <i className="bx bx-check"></i>
      </span>
      {props.label}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default Checkbox;
