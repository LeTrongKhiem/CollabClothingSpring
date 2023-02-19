import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Helmet = (props) => {
  document.title = "Yolo - " + props.title;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>{props.children}</div>;
};

Helmet.propTypes = {
  title: PropTypes.string,
};

export default Helmet;
