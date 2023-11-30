import React from "react";
import { Field } from "react-final-form";
import PropTypes from "prop-types";

import Filter from "../../../components/Filters/Filter";

const ClientsFilters = ({ chooseRole }) => (
  <>
    <Filter
      filterParagraph="Sport type"
    >
      <label htmlFor="sport_type">
        <Field
          name="sport_type"
          component="input"
          type="checkbox"
          value="climbing"
        />
        {" "}
        climbing
      </label>
      <label htmlFor="sport_type">
        <Field
          name="sport_type"
          component="input"
          type="checkbox"
          value="diving"
        />
        {" "}
        diving
      </label>
      <label htmlFor="sport_type">
        <Field
          name="sport_type"
          component="input"
          type="checkbox"
          value="skydiving"
        />
        {" "}
        skydiving
      </label>
    </Filter>

    <Filter
      filterParagraph="Age"
    >
      <label htmlFor="age">
        From
        {" "}
        <Field
          name="minAge"
          component="input"
          type="text"
        />
      </label>
      <label htmlFor="age">
        To
        {" "}
        <Field
          name="maxAge"
          component="input"
          type="text"
        />
      </label>
    </Filter>

    <Filter
      filterParagraph="Experience"
    >
      <label htmlFor="experience">
        From
        {" "}
        <Field
          name="minExp"
          component="input"
          type="text"
        />
      </label>
      <label htmlFor="experience">
        To
        {" "}
        <Field
          name="maxExp"
          component="input"
          type="text"
        />
      </label>
    </Filter>

    { chooseRole === "coach"
      ? (
        <Filter
          filterParagraph="Price"
        >
          <label htmlFor="price">
            From
            {" "}
            <Field
              name="minPrice"
              component="input"
              type="text"
            />
          </label>
          <label htmlFor="price">
            To
            {" "}
            <Field
              name="maxPrice"
              component="input"
              type="text"
            />
          </label>
        </Filter>
      ) : ""}

    <Filter
      filterParagraph="Sort by"
    >
      <label htmlFor="continents">
        <Field
          name="sort_by"
          component="input"
          type="radio"
          value="fromMinAge"
        />
        {" "}
        Age(min first)
      </label>
      <label htmlFor="continents">
        <Field
          name="sort_by"
          component="input"
          type="radio"
          value="fromMaxAge"
        />
        {" "}
        Age(max first)
      </label>

      <label htmlFor="continents">
        <Field
          name="sort_by"
          component="input"
          type="radio"
          value="fromMinExp"
        />
        {" "}
        Experience(min first)
      </label>
      <label htmlFor="continents">
        <Field
          name="sort_by"
          component="input"
          type="radio"
          value="fromMaxExp"
        />
        {" "}
        Experience(max first)
      </label>

      {chooseRole === "coach"
        ? (
          <>
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="fromMinPrice"
              />
              {" "}
              Price(min first)
            </label>
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="fromMaxPrice"
              />
              {" "}
              Price(max first)
            </label>
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="fromMinRate"
              />
              {" "}
              Rating(min first)
            </label>
            <label htmlFor="continents">
              <Field
                name="sort_by"
                component="input"
                type="radio"
                value="fromMaxRate"
              />
              {" "}
              Rating(max first)
            </label>
          </>
        )
        : ""}
    </Filter>
  </>
);

ClientsFilters.propTypes = {
  chooseRole: PropTypes.string,
};

export default ClientsFilters;
