import React from "react";

import FormField from "../../components/FormWrapper/Field";
import FormWrapper from "../../components/FormWrapper";
import required from "../../utils/validators/isRequired";
import minLength from "../../utils/validators/minLength";
import validateEmail from "../../utils/validators/validateEmail";
import composeValidators from "../../utils/validators/composeValidators";
import usePassword from "../../hooks/usePassword";

const Login = () => {
  const { isPasswordVisible, togglePassword } = usePassword();

  const sendUserData = (values) => {
    console.log(values);
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
