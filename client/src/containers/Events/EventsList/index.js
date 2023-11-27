import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

const Paintings = ({ sortingValues, filtersValues }) => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/events/allEvents")
      .then((response) => {
        setAllEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (
      sortingValues
      && sortingValues.sortBy !== undefined
      && sortingValues.ascending !== undefined
    ) {
      axios
        // eslint-disable-next-line max-len
        .get(`https://localhost:7207/api/Painting/getPaintingsSorted?sortBy=${sortingValues.sortBy}&ascending=${sortingValues.ascending}`)
        .then((response) => {
          setAllEvents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [sortingValues]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filtersValues) {
      // eslint-disable-next-line max-len
      if (filtersValues.genres !== undefined && Array.isArray(filtersValues.genres) && filtersValues.genres.length > 0) {
        filtersValues.genres.forEach((genre) => {
          queryParams.append("genres", genre);
        });
      }

      if (filtersValues.minPrice !== undefined) {
        queryParams.set("minPrice", filtersValues.minPrice);
      }

      if (filtersValues.maxPrice !== undefined) {
        queryParams.set("maxPrice", filtersValues.maxPrice);
      }
    }

    const queryString = queryParams.toString();

    console.log(queryString);

    if (queryString !== "") {
      axios
        .get(`https://localhost:7207/api/Painting/getFilteredPaintings?${queryString}`)
        .then((response) => {
          setAllEvents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filtersValues]);

  return (
    <div className="events-wrapper">
      <h1>Artworks</h1>
      <div className="events">
        {allEvents.map(({
          id, name, preview, people,
        }) => (
          <div className="events-item" key={id}>
            <img src={preview} alt="event" />
            <span className="events-item-name">{name}</span>
            <p>
              number of participants:
              {people}
            </p>
            <Link to={`/events/${id}`}>See more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

Paintings.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sortingValues: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  filtersValues: PropTypes.object,
};

export default Paintings;
