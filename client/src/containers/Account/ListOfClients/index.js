import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import formatDate from "../../../utils/formatDate";
import check from "../../../assets/check.png";
import clear from "../../../assets/clear.png";

import "./index.scss";

const ListOfClients = () => {
  const [coachClients, setCoachClients] = useState([]);
  const [currentClientStatus, setCurrentClientStatus] = useState("waiting");
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`http://localhost:5000/coach/clients?status=${currentClientStatus}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setCoachClients(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentClientStatus]);

  const applyClient = (clientId) => {
    axios.patch("http://localhost:5000/coach/acceptClient", {
      token,
      clientId,
    })
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectClient = (id) => {
    axios.delete(`http://localhost:5000/coach/deleteClient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatusChange = (newStatus) => {
    setCurrentClientStatus(newStatus);
  };

  return (
    <>
      <div className="status">
        <span>Status</span>
        <div className="status-btns">
          <button
            type="button"
            onClick={() => handleStatusChange("waiting")}
            className={currentClientStatus === "waiting" ? "current-status" : ""}
          >
            Waiting
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange("accepted")}
            className={currentClientStatus === "accepted" ? "current-status" : ""}
          >
            Accepted
          </button>
        </div>
      </div>
      {coachClients.map(({
        id, name, lastname, dateOfApplication, athleteStatus,
      }) => (
        <div className="client-item" key={id}>
          <div className="client-item-detail">
            <span>{name}</span>
            <span>{lastname}</span>
          </div>
          <div className="client-item-detail">
            <span>Application date:</span>
            <span>{formatDate(dateOfApplication)}</span>
          </div>
          <div className="client-item-detail">
            <span>Status:</span>
            <span>{athleteStatus}</span>
          </div>
          <Link to={`/clients/${id}`}>profile</Link>
          <div className="client-item-btns">
            {athleteStatus === "waiting"
              ? (
                <button type="button" onClick={() => applyClient(id)}>
                  <img src={check} alt="accept" />
                </button>
              ) : ""}
            <button type="button" onClick={() => rejectClient(id)}><img src={clear} alt="reject" /></button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListOfClients;
