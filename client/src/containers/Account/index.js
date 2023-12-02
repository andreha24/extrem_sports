import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { CSSTransition } from "react-transition-group";

import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Posts from "../../components/Posts";
import ListOfClients from "./ListOfClients";
import accountFields from "./UserField/constants";
import Footer from "../../components/Footer";
import UserField from "./UserField";
import checkToken from "../../utils/auth/checkToken";
import ListWrapper from "../../components/ListWrapper";

import "./index.scss";

const Account = () => {
  const [isFormReadonly, setIsFormReadonly] = useState(true);
  const [viewClientsList, setViewClientsList] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/authUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch(() => {
        localStorage.clear();
      });
  }, [token]);

  const regDate = userInfo.reg_date ? new Date(userInfo.reg_date) : null;

  const changeUserData = (values) => {
    console.log(values);
  };

  const handleClientListView = () => {
    setViewClientsList((prev) => !prev);
  };

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
          <>
            <div className="account-wrapper">
              <img src={userInfo.photo} className="account-wrapper__photo" alt="user" />
              <Form
                onSubmit={changeUserData}
                render={({ handleSubmit, invalid }) => (
                  <form onSubmit={handleSubmit} className="account-form">
                    <UserField
                      name="role"
                      type="text"
                      label="Role"
                      initialValue={userInfo.role}
                      disabled={isFormReadonly}
                    />

                    {userInfo.role === "coach" ? (
                      <div className="price-wrapper">
                        <UserField
                          name="price"
                          type="text"
                          label="Price"
                          initialValue={userInfo.price}
                          disabled={isFormReadonly}
                        />
                        <span>$</span>
                      </div>
                    ) : ""}

                    {accountFields.map(({ name, label }) => (
                      <UserField
                        key={name}
                        name={name}
                        type="text"
                        label={label}
                        initialValue={userInfo[name]}
                        disabled={isFormReadonly}
                      />
                    ))}

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
                    {userInfo.role === "coach"
                      ? <button type="button" onClick={handleClientListView}>List of Clients</button> : ""}
                  </form>
                )}
              />
            </div>
            <CSSTransition
              in={viewClientsList}
              timeout={500}
              classNames="client-list-animation"
              unmountOnExit
            >
              <ListWrapper closeList={handleClientListView}>
                <ListOfClients />
              </ListWrapper>
            </CSSTransition>
            <Posts />
          </>
        )}
      <Footer />
    </PageWrapper>
  );
};

export default Account;
