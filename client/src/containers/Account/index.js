import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserField from "./UserField";
import checkToken from "../../utils/auth/checkToken";
import userPhoto from "../../assets/people-feedback/Andrey_Sherstyuk.jpg";

import "./index.scss";

const Account = () => {
  const [isFormReadonly, setIsFormReadonly] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/user")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
        }
      });
  }, [token]);

  const changeUserData = (values) => {
    console.log(values);
  };

  const regDate = userInfo.reg_date ? new Date(userInfo.reg_date) : null;

  return (
    <PageWrapper>
      <Header />
      {checkToken() === null
        ? (
          <div className="link-log-wrapper">
            <div className="link-log">
              <span>You need to log in for use this page</span>
              <span>
                go to
                <Link to="/login" className="link-log-btn">Login</Link>
              </span>
            </div>
          </div>
        )
        : (
          <div className="user-wrapper">
            <img src={userPhoto} className="user-wrapper__photo" alt="user" />
            <Form
              onSubmit={changeUserData}
              render={({ handleSubmit, invalid }) => (
                <form onSubmit={handleSubmit} className="user-form">
                  <UserField
                    name="role"
                    type="text"
                    label="Role"
                    initialValue={userInfo.role}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="name"
                    type="text"
                    label="Name"
                    initialValue={userInfo.name}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="lastname"
                    type="text"
                    label="Lastname"
                    initialValue={userInfo.lastname}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="age"
                    type="text"
                    label="Age"
                    initialValue={userInfo.age}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="experience"
                    type="text"
                    label="Experience"
                    initialValue={userInfo.experience}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="sport_type"
                    type="text"
                    label="Sport type"
                    initialValue={userInfo.sport_type}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="country"
                    type="text"
                    label="Country"
                    initialValue={userInfo.country}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="city"
                    type="text"
                    label="City"
                    initialValue={userInfo.city}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="mail"
                    type="text"
                    label="Mail"
                    initialValue={userInfo.mail}
                    disabled={isFormReadonly}
                  />

                  <UserField
                    name="reg_date"
                    type="text"
                    label="Reg date"
                    initialValue={regDate ? format(regDate, "dd-MM-yyyy") : ""}
                    disabled
                  />

                  <button
                    onClick={() => setIsFormReadonly((prev) => !prev)}
                    type={isFormReadonly ? "submit" : "button"}
                    disabled={invalid && !isFormReadonly}
                    className="user-form__btn"
                  >
                    {isFormReadonly ? "Edit" : "Save"}
                  </button>
                </form>
              )}
            />
          </div>
        )}
      <Footer />
    </PageWrapper>
  );
};

export default Account;
