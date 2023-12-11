import React from "react";
import { Form } from "react-final-form";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import "./index.scss";

const Filters = ({
  className, closeFilters, updateFilters, children,
}) => {
  const { t } = useTranslation();
  const sendFilters = (values) => {
    updateFilters(values);
  };

  return (
    <Form
      onSubmit={sendFilters}
      render={({ handleSubmit, form: { reset } }) => (
        <form onSubmit={handleSubmit} className={className}>
          {closeFilters && <button type="button" onClick={closeFilters} className="close-all-filters">X</button>}
          <span className="filters-paragraph">{t("filterBlock.name")}</span>
          {children}
          <div className="filters-btns">
            <button type="submit" className="apply-filters-btn">{t("filterBlock.button")}</button>
            <button
              type="button"
              onClick={() => {
                reset();
                updateFilters({});
              }}
              className="apply-filters-btn"
            >
              {t("filterBlock.resetButton")}
            </button>
          </div>
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
