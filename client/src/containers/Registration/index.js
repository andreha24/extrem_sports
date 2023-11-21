import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const { togglePassword, isPasswordVisible } = usePassword();

  const navigate = useNavigate();

  const changeRole = (value) => {
    setSelectedRole(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const sendUserData = (values) => {
    const userData = {
      ...values,
      img: selectedFile.name,
    };

    const formData = new FormData();
    formData.append("img", selectedFile);

    axios
      .post("http://localhost:5000/api/registration", userData)
      .then(() => {
        alert("User registration successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });

    axios
      .post("http://localhost:5000/api/addUserPhoto", formData)
      .then(() => {
        console.log("User photo successful");
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
            <option value="athlete">Athlete</option>
            <option value="coach">Coach</option>
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
      <input type="file" onChange={handleFileChange} name="photo" />
    </FormWrapper>
  );
};

export default Registration;
