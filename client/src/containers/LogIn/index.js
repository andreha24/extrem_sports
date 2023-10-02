import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

import "./index.scss"

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);

  const togglePassword = () => {
    setViewPassword(prev => !prev);
  }

  const required = (value) => (value ? undefined : "Required");
  const minLength = (value) => (value.length > 8 ? undefined : "Length must be more then 8");
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !(emailRegex.test(value)) ? "Некорректный email" : undefined;
  };

  const composeValidators = (...validators) => (
    (value) => validators.reduce((error, validator) => error || validator(value), undefined)
  );

  const sendUserData = (values) => {
    console.log(values);
  };

  return (
    <div className="form-container">
      <Link className="form-container__paragraph" to="/">SPORTIFY</Link>

      <div className="form-container__wrapper">
        <Form
          onSubmit={sendUserData}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="auth-form">
              <h2 className="auth-form__paragraph">Log In</h2>

              <Field name="mail" validate={composeValidators(required, validateEmail)}>
                {({ input, meta }) => (
                  <div className="auth-form__block">
                    <input
                      {...input}
                      name="mail"
                      placeholder="mail"
                      className="auth-form__block__input"
                      type="text"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <Field name="password" validate={composeValidators(required, minLength)}>
                {({ input, meta }) => (
                  <div className="auth-form__block">
                    <input
                      {...input}
                      name="password"
                      placeholder="password"
                      className="auth-form__block__input"
                      type={viewPassword ? "text" : "password"}
                    />

                    <button
                      type="button"
                      onClick={togglePassword}
                      className="show-password"
                    >
                      {viewPassword ? "hide" : "show"}
                    </button>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <button type="submit" className="auth-form__btn">Log In</button>

              <Link to="/registration" className="auth-form__create-link">Create account</Link>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Login;