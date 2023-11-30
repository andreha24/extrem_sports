import React from "react";
import { Form } from "react-final-form";
import PropTypes from "prop-types";

import "./index.scss";

const Filters = ({
  className, closeFilters, updateFilters, children,
}) => {
  const sendFilters = (values) => {
    updateFilters(values);
  };

  return (
    <Form
      onSubmit={sendFilters}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={className}>
          {closeFilters && <button type="button" onClick={closeFilters} className="close-all-filters">X</button>}
          <span className="filters-paragraph">Filters</span>
          {children}
          <button type="submit" className="apply-filters-btn">Apply filters</button>
        </form>
      )}
    />
  );
};

Filters.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeFilters: PropTypes.func,
  updateFilters: PropTypes.func,
};

export default Filters;
