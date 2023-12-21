import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field } from "react-final-form";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import FormWrapper from "../../components/FormWrapper";
import FormField from "../../components/FormWrapper/Field";
import required from "../../utils/validators/isRequired";
import minLength from "../../utils/validators/minLength";
import validateEmail from "../../utils/validators/validateEmail";
import composeValidators from "../../utils/validators/composeValidators";
import usePassword from "../../hooks/usePassword";
import toastSuccess from "../../utils/toast/toastSuccess";
import generateUniqueFileName from "../../utils/generateUniqueFileName";

import "./index.scss";

const Registration = () => {
  const { t } = useTranslation();
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
      img: generateUniqueFileName(selectedFile.name),
    };

    const formData = new FormData();
    formData.append("img", selectedFile, userData.img);

    axios
      .post("http://localhost:5000/api/registration", userData)
      .then((response) => {
        toastSuccess(response.message);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });

    axios
      .post("http://localhost:5000/bucket/addPhoto", formData)
      .then(() => {
        console.log("WOW");
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });
  };

  return (
    <FormWrapper
      onSubmit={sendUserData}
      linkTo="/login"
      linkToName={t("loginPage.paragraph")}
      paragraphName={t("regPage.paragraph")}
    >
      <ToastContainer style={{ width: "330px" }} />
      <div className="inputs-wrapper">
        <div className="inputs-wrapper__block">
          <FormField
            name="name"
            validators={required}
            type="text"
            placeholder={t("regPage.name")}
          />

          <FormField
            name="lastname"
            validators={required}
            type="text"
            placeholder={t("regPage.lastname")}
          />

          <FormField
            name="age"
            validators={required}
            type="text"
            placeholder={t("regPage.age")}
          />

          <FormField
            name="weight"
            validators={required}
            type="text"
            placeholder={t("regPage.weight")}
          />

          <FormField
            name="height"
            validators={required}
            type="text"
            placeholder={t("regPage.height")}
          />

          <FormField
            name="country"
            validators={required}
            type="text"
            placeholder={t("regPage.country")}
          />

        </div>

        <div className="inputs-wrapper__block">
          <FormField
            name="city"
            validators={required}
            type="text"
            placeholder={t("regPage.city")}
          />

          <Field
            name="sport_type"
            component="select"
            validate={required}
          >
            <option value="" disabled>{t("regPage.sport.name")}</option>
            <option value="climbing">{t("regPage.sport.climbing")}</option>
            <option value="skydiving">{t("regPage.sport.skydiving")}</option>
            <option value="diving">{t("regPage.sport.diving")}</option>
          </Field>

          <FormField
            name="experience"
            validators={required}
            type="text"
            placeholder={t("regPage.experience")}
          />

          <Field
            name="role"
            component="select"
            validate={required}
            onChange={(event) => { changeRole(event.target.value); }}
            initialValue={selectedRole}
          >
            <option value="" disabled>{t("regPage.role.name")}</option>
            <option value="athlete">{t("regPage.role.athlete")}</option>
            <option value="coach">{t("regPage.role.coach")}</option>
          </Field>

          {selectedRole === "coach" ? (
            <FormField
              name="price_per_lesson"
              validators={required}
              type="text"
              placeholder={t("regPage.price")}
            />
          ) : " "}

          <FormField
            name="mail"
            validators={composeValidators(required, validateEmail)}
            type="text"
            placeholder={t("regPage.mail")}
          />

          <FormField
            name="password"
            validators={composeValidators(required, minLength)}
            hasButton
            placeholder={t("regPage.password")}
            type={isPasswordVisible ? "text" : "password"}
            togglePassword={togglePassword}
            viewPassword={isPasswordVisible}
          />
        </div>
      </div>
      <div className="file-upload">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <input type="file" onChange={handleFileChange} name="photo" />
          <span>{selectedFile === null ? "Choose your photo" : "Photo added"}</span>
        </label>
      </div>
    </FormWrapper>
  );
};

export default Registration;
