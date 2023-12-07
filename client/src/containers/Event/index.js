import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import ListWrapper from "../../components/ListWrapper";
import RegUsersList from "./RegUsersList";
import formatDate from "../../utils/formatDate";
import Footer from "../../components/Footer";
import checkRole from "../../utils/auth/checkRole";
import toastError from "../../utils/toast/toastError";
import toastSuccess from "../../utils/toast/toastSuccess";

import "./index.scss";

const Event = () => {
  const currentRole = checkRole();
  const [event, setEvent] = useState({});
  const [viewUsersList, setViewUsersList] = useState(false);
  const navigate = useNavigate();
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
      toastError("You need to log in");
      return;
    }
    axios.post("http://localhost:5000/events/addUserToEvent", {
      token,
      eventId,
    })
      .then((response) => {
        toastSuccess(response.data.message);
        setEvent({
          ...event,
          registeredUsers: [
            ...event.registeredUsers,
            response.data.user,
          ],
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.request.status === 400) {
          toastError("You already register");
        }
      });
  };

  const deleteEvent = (id) => {
    axios.delete(`http://localhost:5000/events/deleteEvent/${id}`)
      .then((response) => {
        toastSuccess(response.data);
        setTimeout(() => {
          navigate("/events");
        }, 3000);
      })
      .catch(() => {
        toastError("???");
      });
  };

  return (
    <PageWrapper>
      <ToastContainer />
      <Header />
      <div className="event">
        {currentRole === "admin"
          ? (
            <button
              type="button"
              onClick={() => deleteEvent(eventId)}
              className="event-del-btn"
            >
              delete event
            </button>
          ) : ""}
        <img src={event.preview} className="event-img" alt="event" />
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
            <ListWrapper closeList={changeListView}>
              <RegUsersList users={event.registeredUsers} />
            </ListWrapper>
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
