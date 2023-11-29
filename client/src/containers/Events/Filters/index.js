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
            filterParagraph="Continent"
          >
            <label htmlFor="continents">
              <Field
                name="continents"
                component="input"
                type="checkbox"
                value="eurasia"
              />
              {" "}
              Eurasia
            </label>
            <label htmlFor="continents">
              <Field
                name="continents"
                component="input"
                type="checkbox"
                value="north_america"
              />
              {" "}
              North America
            </label>
            <label htmlFor="continents">
              <Field
                name="continents"
                component="input"
                type="checkbox"
                value="south_america"
              />
              {" "}
              South America
            </label>
            <label htmlFor="continents">
              <Field
                name="continents"
                component="input"
                type="checkbox"
                value="australia"
              />
              {" "}
              Australia
            </label>
            <label htmlFor="continents">
              <Field
                name="continents"
                component="input"
                type="checkbox"
                value="africa"
              />
              {" "}
              Africa
            </label>
          </Filter>

          <Filter
            filterParagraph="Sort by"
          >
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="fromMinPeople"
              />
              {" "}
              People(min first)
            </label>
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="fromMaxPeople"
              />
              {" "}
              People(max first)
            </label>
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="earliestStartDate"
              />
              {" "}
              earliest start date first
            </label>
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="furthestStartDate"
              />
              {" "}
              start date from furthest
            </label>
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
