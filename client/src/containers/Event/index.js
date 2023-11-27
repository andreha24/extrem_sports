import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import formatDate from "../../utils/formatDate";
import Footer from "../../components/Footer";

import "./index.scss";

const Event = () => {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/events/event/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <PageWrapper>
      <Header />
      <div className="event">
        <img src={event.preview} className="event-img" alt="painting" />

        <div className="event-details">
          <span>
            Name:
            {event.name}
          </span>
          <span>
            Description:
            {event.description}
          </span>
          <span>
            Continent:
            {event.continent}
          </span>
          <span>
            Country:
            {event.country}
          </span>
          <span>
            City:
            {event.city}
          </span>
          <span>
            People:
            {event.people}
          </span>
          <span>
            Start date:
            {event.start_date ? formatDate(event.start_date) : "N/A"}
          </span>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default Event;
