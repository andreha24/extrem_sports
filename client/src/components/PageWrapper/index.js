import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const PageWrapper = ({ children }) => (
  <div className="page-wrapper">
    {children}
  </div>
);

PageWrapper.propTypes = {
  children: PropTypes.node,
};

export default PageWrapper;
