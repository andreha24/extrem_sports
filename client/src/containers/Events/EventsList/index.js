import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

const Paintings = React.memo(({ filtersValues }) => {
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
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const queryParams = new URLSearchParams();

    // Add continents to the query string
    if (filtersValues.continents && filtersValues.continents.length > 0) {
      queryParams.append("continents", filtersValues.continents.join(","));
    }

    // Add sorting option to the query string
    if (filtersValues.sort_by) {
      queryParams.append("sort_by", filtersValues.sort_by);
    }

    // Fetch data only if there are filters
    if (queryParams.toString() !== "") {
      axios
        .get(`http://localhost:5000/events/eventsWithFilters?${queryParams}`)
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
        {allEvents.length === 0 ? <div>0 finds</div> : ""}
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
});

Paintings.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filtersValues: PropTypes.object,
};

export default Paintings;
