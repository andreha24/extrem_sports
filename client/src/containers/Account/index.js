import React, { useState } from "react";
import { Form } from "react-final-form";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserField from "./UserField";
import userPhoto from "../../assets/people-feedback/Andrey_Sherstyuk.jpg";

import "./index.scss";

const Account = () => {
  const [isFormReadonly, setIsFormReadonly] = useState(true);

  const changeUserData = (values) => {
    console.log(values);
  };

  return (
    <>
      <Header />
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
                initialValue="Trainer"
                disabled={isFormReadonly}
              />

              <UserField
                name="name"
                type="text"
                label="Name"
                initialValue="Andrey"
                disabled={isFormReadonly}
              />

              <UserField
                name="lastname"
                type="text"
                label="Lastname"
                initialValue="Sherstiuk"
                disabled={isFormReadonly}
              />

              <UserField
                name="age"
                type="text"
                label="Age"
                initialValue="20"
                disabled={isFormReadonly}
              />

              <UserField
                name="experience"
                type="text"
                label="Experience"
                initialValue="4"
                disabled={isFormReadonly}
              />

              <UserField
                name="sport_type"
                type="text"
                label="Sport type"
                initialValue="climbing"
                disabled={isFormReadonly}
              />

              <UserField
                name="country"
                type="text"
                label="Country"
                initialValue="Ukraine"
                disabled={isFormReadonly}
              />

              <UserField
                name="city"
                type="text"
                label="City"
                initialValue="Kyiv"
                disabled={isFormReadonly}
              />

              <UserField
                name="mail"
                type="text"
                label="Mail"
                initialValue="sherstukandrey@gmail.com"
                disabled={isFormReadonly}
              />

              <UserField
                name="reg_date"
                type="text"
                label="Reg date"
                initialValue="10.12.2005"
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
      <Footer />
    </>
  );
};

export default Account;
