import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import checkRole from "../../../utils/auth/checkRole";
import EventForm from "../EventForm";

import "./index.scss";

const EventsList = React.memo(({ filtersValues }) => {
  const currentRole = checkRole();
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

  const changeFormView = () => {
    setIsFormOpen((prev) => !prev);
  };

  useEffect(() => {
    // Check if filtersValues is an empty object
    const isEmptyObject = Object.keys(filtersValues).length === 0;

    if (isEmptyObject) {
      axios.get("http://localhost:5000/events/allEvents")
        .then((response) => {
          setAllEvents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filtersValues]);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filtersValues.continents && filtersValues.continents.length > 0) {
      queryParams.append("continents", filtersValues.continents.join(","));
    }

    if (filtersValues.sport_type && filtersValues.sport_type.length > 0) {
      queryParams.append("sport_types", filtersValues.sport_type.join(","));
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
    <>
      {isFormOpen && <EventForm changeFormView={changeFormView} />}
      <div className="events-wrapper">
        {currentRole === "admin"
          ? (
            <button
              type="button"
              onClick={changeFormView}
              className="create-event-btn"
            >
              {t("eventsPage.eventList.createEventBtn")}
            </button>
          ) : ""}
        <h1>{t("eventsPage.paragraph")}</h1>
        <div className="events">
          {allEvents.length === 0 ? <div>{t("eventsPage.eventList.noMatches")}</div> : ""}
          {allEvents.map(({
            id, name, preview, people, registeredUsersCount,
          }) => (
            <div className="events-item" key={id}>
              <img src={preview} alt="event" />
              <span className="events-item-name">{name}</span>
              <p>
                {t("eventsPage.eventList.people")}
                {" "}
                {registeredUsersCount}
                /
                {people}
              </p>
              <Link to={`/events/${id}`}>{t("eventsPage.eventList.seeMore")}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

EventsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filtersValues: PropTypes.object,
};

export default EventsList;
