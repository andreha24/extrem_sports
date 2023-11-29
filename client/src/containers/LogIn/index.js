import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import FormField from "../../components/FormWrapper/Field";
import FormWrapper from "../../components/FormWrapper";
import required from "../../utils/validators/isRequired";
import minLength from "../../utils/validators/minLength";
import validateEmail from "../../utils/validators/validateEmail";
import composeValidators from "../../utils/validators/composeValidators";
import setAuthToken from "../../utils/auth/setAuthToken";
import usePassword from "../../hooks/usePassword";

const Login = () => {
  const { isPasswordVisible, togglePassword } = usePassword();

  const navigate = useNavigate();

  const sendUserData = (values) => {
    axios.post("http://localhost:5000/api/login", values)
      .then((response) => {
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setAuthToken(token);
        alert("Welcome");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error login user", error);
        alert("Incorrect mail or password");
      });
  };

  return (
    <FormWrapper
      onSubmit={sendUserData}
      linkTo="/registration"
      linkToName="registration"
      paragraphName="Log In"
    >
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
    </FormWrapper>
  );
};

export default Login;
