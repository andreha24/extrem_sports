import React from "react";
import { Field } from "react-final-form";

import Filter from "../../../components/Filters/Filter";

const EventFilters = () => (
  <>
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
  </>
);

export default EventFilters;
