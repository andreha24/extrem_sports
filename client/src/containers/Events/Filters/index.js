import React from "react";
import { Form, Field } from "react-final-form";
import PropTypes from "prop-types";

import Filter from "./Filter";

import "./index.scss";

const Filters = ({ className, closeFilters, updateFilters }) => {
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
          <Filter
            filterParagraph="Genre"
          >
            <label htmlFor="genres">
              <Field
                name="genres"
                component="input"
                type="checkbox"
                value="landscape"
              />
              {" "}
              landscape
            </label>
            <label htmlFor="genres">
              <Field
                name="genres"
                component="input"
                type="checkbox"
                value="still_life"
              />
              {" "}
              still life
            </label>
            <label htmlFor="genres">
              <Field
                name="genres"
                component="input"
                type="checkbox"
                value="portrait"
              />
              {" "}
              portrait
            </label>
          </Filter>

          <Filter
            filterParagraph="Price"
          >
            <div className="price-option">
              <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="low_price">From</label>
                <Field
                  name="minPrice"
                  component="input"
                  type="text"
                />
              </div>
              <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="high_price">to</label>
                <Field
                  name="maxPrice"
                  component="input"
                  type="text"
                />
              </div>
            </div>
          </Filter>

          <button type="submit">Apply filters</button>
        </form>
      )}
    />
  );
};

Filters.propTypes = {
  className: PropTypes.string,
  closeFilters: PropTypes.func,
  updateFilters: PropTypes.func,
};

export default Filters;
