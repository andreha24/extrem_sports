import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import StarsRating from "../../../components/StarsRating";

import "./index.scss";

const ClientsList = ({ filtersValues, chooseRole, handleRole }) => {
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/unAuth/allUsers/?role=${chooseRole}`)
      .then((response) => {
        setClientsList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chooseRole]);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filtersValues.sport_type && filtersValues.sport_type.length > 0) {
      queryParams.append("sport_type", filtersValues.sport_type.join(","));
    }

    const addParamIfExists = (paramName, paramValue) => {
      if (paramValue !== undefined) {
        queryParams.set(paramName, paramValue);
      }
    };

    addParamIfExists("minAge", filtersValues.minAge);
    addParamIfExists("maxAge", filtersValues.maxAge);
    addParamIfExists("minExp", filtersValues.minExp);
    addParamIfExists("maxExp", filtersValues.maxExp);
    addParamIfExists("minPrice", filtersValues.minPrice);
    addParamIfExists("maxPrice", filtersValues.maxPrice);

    if (filtersValues.sort_by) {
      queryParams.append("sort_by", filtersValues.sort_by);
    }

    if (queryParams.toString() !== "") {
      axios
        .get(`http://localhost:5000/unAuth/allUsersWithFilters?role=${chooseRole}&${queryParams}`)
        .then((response) => {
          setClientsList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filtersValues]);

  return (
    <div className="users-container">
      <div className="role-btns">
        <button
          type="button"
          onClick={() => handleRole("athlete")}
          className={chooseRole === "athlete" ? "current-role" : ""}
        >
          Athletes
        </button>
        <button
          type="button"
          onClick={() => handleRole("coach")}
          className={chooseRole === "coach" ? "current-role" : ""}
        >
          Trainers
        </button>
      </div>
      <div className="users-list">
        {clientsList.map(({
          // eslint-disable-next-line camelcase
          id, name, lastname, photo, sport_type, country, city, experience, price, rating,
        }) => (
          <div key={id} className="users-list-item">
            <div className="users-list-item-info">
              <img src={photo} alt="user" />
              <div className="users-list-item-info-details">
                <span>
                  {name}
                  {" "}
                  {lastname}
                </span>
                <span>
                  {country}
                  ,
                  {" "}
                  {city}
                </span>
                <span>
                  Specialized in
                  {" "}
                  {/* eslint-disable-next-line camelcase */}
                  {sport_type}
                </span>
                <span>
                  Experience -
                  {" "}
                  {experience}
                  {" "}
                  years
                </span>
                {chooseRole === "coach"
                  ? (
                    <>
                      <span>
                        Price -
                        {" "}
                        {price}
                        {" "}
                        $
                      </span>
                      {" "}
                      <span>
                        Rating -
                        {" "}
                        <StarsRating
                          value={rating}
                          readOnly={false}
                        />

                      </span>
                    </>
                  ) : ""}
              </div>
            </div>
            <Link to={`/clients/${id}`} className="check-profile">check profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

ClientsList.propTypes = {
  chooseRole: PropTypes.string,
  handleRole: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  filtersValues: PropTypes.object,
};

export default ClientsList;
