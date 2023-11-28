import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import formatDate from "../../utils/formatDate";
import Footer from "../../components/Footer";

import "./index.scss";

const Event = () => {
  const [event, setEvent] = useState({});
  const [viewUsersList, setViewUsersList] = useState(false);
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

  const changeListView = () => {
    setViewUsersList((prev) => !prev);
  };

  const addUserIntoEvent = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      alert("You need to log in");
      return;
    }
    axios.post("http://localhost:5000/events/addUserToEvent", {
      token,
      eventId,
    })
      .then((response) => {
        console.log(response);
        console.log("Congats");
      })
      .catch((err) => {
        if (err.request.status === 400) {
          alert("You already register");
        }
      });
  };

  return (
    <PageWrapper>
      <Header />
      <div className="event">
        <img src={event.preview} className="event-img" alt="painting" />

        <div className="event-details">
          <div className="event-detail">
            <span>Name:</span>
            <span>{event.name}</span>
          </div>
          <div className="event-detail description">
            <span>Description:</span>
            <span>
              Dive into the exciting world of vertical challenges with our exciting rock climbing event! Get together
              with like-minded people and outdoor enthusiasts to overcome vertical walls and conquer high mountain
              peaks. Discover the excitement and adrenaline of every climb and enjoy the incredible views from above.
              This event is designed to bring together people who share a passion for adventure and create unique
              memories of conquering heights together in an atmosphere of mutual support and inspiration.
            </span>
          </div>
          <div className="event-detail">
            <span>Continent:</span>
            <span>{event.continent}</span>
          </div>
          <div className="event-detail">
            <span>Country:</span>
            <span>{event.country}</span>
          </div>
          <div className="event-detail">
            <span>City:</span>
            <span>{event.city}</span>
          </div>
          <div className="event-detail people">
            <span>Take part:</span>
            <span>
              {event.registeredUsers?.length}
              /
              {event.people}
            </span>
            {event.registeredUsers?.length !== 0
              ? <button type="submit" onClick={changeListView}>list of registered users</button> : ""}
          </div>
          <CSSTransition
            in={viewUsersList}
            timeout={500}
            classNames="user-list-animation"
            unmountOnExit
          >
            <div className="registered-users">
              <button type="button" onClick={changeListView} className="registered-users__close">X</button>
              {event.registeredUsers?.map(({ id, name, lastname }) => (
                <div key={id} className="registered-user">
                  <div>
                    <span>{name}</span>
                    <span className="registered-user-lastname">{lastname}</span>
                  </div>
                  <Link to={`/users/${id}`}>See profile</Link>
                </div>
              ))}
            </div>
          </CSSTransition>
          <div className="event-detail">
            <span>Start date:</span>
            <span>{event.start_date ? formatDate(event.start_date) : "N/A"}</span>
          </div>
          <button type="button" onClick={addUserIntoEvent} className="get-place-btn">Get a place</button>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default Event;
