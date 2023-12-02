import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

const EventsList = React.memo(({ filtersValues }) => {
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

    if (filtersValues.continents && filtersValues.continents.length > 0) {
      queryParams.append("continents", filtersValues.continents.join(","));
    }

    if (filtersValues.sort_by) {
      queryParams.append("sort_by", filtersValues.sort_by);
    }

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
      <h1>Events</h1>
      <div className="events">
        {allEvents.length === 0 ? <div>0 finds</div> : ""}
        {allEvents.map(({
          id, name, preview, people, registeredUsersCount,
        }) => (
          <div className="events-item" key={id}>
            <img src={preview} alt="event" />
            <span className="events-item-name">{name}</span>
            <p>
              number of participants:
              {" "}
              {registeredUsersCount}
              /
              {people}
            </p>
            <Link to={`/events/${id}`}>See more</Link>
          </div>
        ))}
      </div>
    </div>
  );
});

EventsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filtersValues: PropTypes.object,
};

export default EventsList;
