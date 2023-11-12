import React, { useState } from "react";
import { Field } from "react-final-form";
import axios from "axios";

import FormWrapper from "../../components/FormWrapper";
import FormField from "../../components/FormWrapper/Field";
import required from "../../utils/validators/isRequired";
import minLength from "../../utils/validators/minLength";
import validateEmail from "../../utils/validators/validateEmail";
import composeValidators from "../../utils/validators/composeValidators";
import usePassword from "../../hooks/usePassword";

import "./index.scss";

const Registration = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { togglePassword, isPasswordVisible } = usePassword();

  const changeRole = (value) => {
    setSelectedRole(value);
  };

  const sendUserData = (values) => {
    console.log(values);
    axios.post("http://localhost:5000/api/registration", values)
      .then((response) => {
        console.log("User registration successful", response);
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });
  };

  return (
    <FormWrapper
      onSubmit={sendUserData}
      linkTo="/login"
      linkToName="Log in"
      paragraphName="Registration"
    >

      <div className="inputs-wrapper">
        <div className="inputs-wrapper__block">
          <FormField
            name="name"
            validators={required}
            type="text"
          />

          <FormField
            name="lastname"
            validators={required}
            type="text"
          />

          <FormField
            name="age"
            validators={required}
            type="text"
          />

          <FormField
            name="country"
            validators={required}
            type="text"
          />

          <FormField
            name="city"
            validators={required}
            type="text"
          />
        </div>

        <div className="inputs-wrapper__block">
          <Field
            name="sport_type"
            component="select"
            validate={required}
          >
            <option value="" disabled>Type of sport</option>
            <option value="climbing">Climbing</option>
            <option value="skydiving">Skydiving</option>
            <option value="diving">Diving</option>
          </Field>

          <FormField
            name="experience"
            validators={required}
            type="text"
          />

          <Field
            name="role"
            component="select"
            validate={required}
            onChange={(event) => { changeRole(event.target.value); }}
            initialValue={selectedRole}
          >
            <option value="" disabled>Role</option>
            <option value="Athlete">Athlete</option>
            <option value="Coach">Coach</option>
          </Field>

          <FormField
            name="mail"
            validators={composeValidators(required, validateEmail)}
            type="text"
          />

          <FormField
            name="password"
            validators={composeValidators(required, minLength)}
            hasButton
            type={isPasswordVisible ? "text" : "password"}
            togglePassword={togglePassword}
            viewPassword={isPasswordVisible}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default Registration;
