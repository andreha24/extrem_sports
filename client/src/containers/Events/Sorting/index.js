import React, { useState } from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Sorting = ({ updateSorting }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);

    let sortBy = "";
    let ascending = true;

    switch (selectedSortOption) {
      case "form_low_price":
        sortBy = "price";
        ascending = true;
        break;
      case "from_high_price":
        sortBy = "price";
        ascending = false;
        break;
      case "from_last_date":
        sortBy = "date";
        ascending = true;
        break;
      case "from_old_date":
        sortBy = "date";
        ascending = false;
        break;
      default:
        // По умолчанию
        sortBy = "date";
        ascending = true;
    }

    updateSorting({ sortBy, ascending });
  };

  return (
    <div className="sorting">
      <select name="select" id="sort" onChange={handleSortChange} value={sortOption}>
        <option value="form_low_price">Price (Low to High)</option>
        <option value="from_high_price">Price (High to Low)</option>
        <option value="from_last_date">Date (Recent First)</option>
        <option value="from_old_date">Date (Oldest First)</option>
      </select>
    </div>
  );
};

Sorting.propTypes = {
  updateSorting: PropTypes.func,
};

export default Sorting;
