import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-stars";

import Header from "../../components/Header";
import Posts from "../../components/Posts";
import Footer from "../../components/Footer";

import "./index.scss";

const Client = () => {
  const [userData, setUserData] = useState({});
  const [rating, setRating] = useState(0);
  const { userId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/unAuth/user/${userId}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      });
  }, [rating]);

  const sendApplication = (coachId) => {
    axios.post("http://localhost:5000/coach/addClient", {
      coachId,
      token,
    })
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
    axios.post("http://localhost:5000/coach/addRating", {
      token,
      userId,
      newRating,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="user-container">
        <img src={userData.photo} className="user-container-photo" alt="user" />

        <div className="user-info">
          <span>
            Name:
            {userData.name}
          </span>
          <span>
            Lastname:
            {userData.lastname}
          </span>
          <span>
            Role:
            {userData.role}
          </span>
          {userData.role === "coach" ? (
            <>
              <span>
                Price:
                {userData.price}
                $
              </span>
              <span>
                Rating:
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  color2="#ffd700"
                  half={false}
                  value={userData.rating}
                />
              </span>
            </>
          ) : ""}
          <span>
            Age:
            {userData.age}
          </span>
          <span>
            Country:
            {userData.country}
          </span>
          <span>
            City:
            {userData.city}
          </span>
          <span>
            Specialized in:
            {userData.sport_type}
          </span>
          <span>
            Experience:
            {userData.experience}
            years
          </span>
          <span>
            Contact to me:
            {" "}
            {userData.mail}
          </span>
          <div className="user-info-btns">
            {userData.role === "coach" ? (
              <>
                <button type="button" onClick={() => sendApplication(userId)}>Application for a lesson</button>
                <button type="button">Feedback</button>
              </>
            ) : ""}
            <button type="button">Report</button>
          </div>
        </div>
      </div>
      <Posts user userId={userId} />
      <Footer />
    </>
  );
};

export default Client;
