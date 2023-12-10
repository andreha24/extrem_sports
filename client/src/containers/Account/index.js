import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { CSSTransition } from "react-transition-group";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Posts from "../../components/Posts";
import ListOfClients from "./ListOfClients";
import accountFields from "./UserField/constants";
import Footer from "../../components/Footer";
import UserField from "./UserField";
import checkToken from "../../utils/auth/checkToken";
import ListWrapper from "../../components/ListWrapper";
import toastSuccess from "../../utils/toast/toastSuccess";
import toastError from "../../utils/toast/toastError";
import generateUniqueFileName from "../../utils/generateUniqueFileName";

import "./index.scss";

const Account = () => {
  const { t } = useTranslation();
  const [isFormReadonly, setIsFormReadonly] = useState(true);
  const [viewClientsList, setViewClientsList] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("token");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

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

  const changeUserData = (values) => {
    let photoName = userInfo.photo;
    const formData = new FormData();

    if (selectedFile !== null) {
      photoName = generateUniqueFileName(selectedFile.name);
    }

    const newData = {
      ...values,
      photo: photoName,
      token,
    };

    axios.patch("http://localhost:5000/api/changeUserData", newData)
      .then((response) => {
        setUserInfo(response.data.updated);
        toastSuccess(response.data.message);
      })
      .catch(() => {
        toastError("???");
      });

    if (selectedFile !== null) {
      formData.append("oldPhoto", userInfo.photo);
      formData.append("newPhoto", selectedFile, photoName);
      axios.post("http://localhost:5000/bucket/editPhoto", formData)
        .then(() => {
          toastSuccess("Photo changed");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClientListView = () => {
    setViewClientsList((prev) => !prev);
  };

  const regDate = userInfo.reg_date ? new Date(userInfo.reg_date) : null;
  return (
    <PageWrapper>
      <ToastContainer style={{ width: "330px" }} />
      <Header />
      {checkToken() === null
        ? (
          <div className="link-log-wrapper">
            <div className="link-log">
              <span>{t("accountPage.noRegBlock.phrase")}</span>
              <span>
                {t("accountPage.noRegBlock.beforeBtn")}
                <Link to="/login" className="link-log-btn">{t("accountPage.noRegBlock.btn")}</Link>
              </span>
            </div>
          </div>
        )
        : (
          <>
            <div className="account-wrapper">
              <div className="img-wrapper">
                {!isFormReadonly
                  && (
                    <div className="file-upload">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label>
                        <input type="file" onChange={handleFileChange} name="file" />
                        <span>{selectedFile === null ? "Choose photo if you want to change" : "New photo added"}</span>
                      </label>
                    </div>
                  )}
                <img key={userInfo.photoUrl} src={userInfo.photoUrl} className="account-wrapper__photo" alt="user" />
              </div>
              <Form
                onSubmit={changeUserData}
                render={({ handleSubmit, invalid }) => (
                  <form onSubmit={handleSubmit} className="account-form">
                    <UserField
                      name="role"
                      type="text"
                      label={t("accountPage.role")}
                      initialValue={userInfo.role}
                      disabled={isFormReadonly}
                    />

                    {userInfo.role === "coach" ? (
                      <div className="price-wrapper">
                        <UserField
                          name="price"
                          type="text"
                          label={t("accountPage.price")}
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
                        label={t(`accountPage.${label}`)}
                        initialValue={userInfo[name]}
                        disabled={isFormReadonly}
                      />
                    ))}

                    <UserField
                      name="reg_date"
                      type="text"
                      label={t("accountPage.regDate")}
                      initialValue={regDate ? format(regDate, "dd-MM-yyyy") : ""}
                      disabled
                    />

                    <button
                      onClick={() => setIsFormReadonly((prev) => !prev)}
                      type={isFormReadonly ? "submit" : "button"}
                      disabled={invalid && !isFormReadonly}
                      className="user-form__btn"
                    >
                      {isFormReadonly ? t("accountPage.editBtn") : t("accountPage.saveBtn")}
                    </button>
                    {userInfo.role === "coach"
                      ? <button type="button" onClick={handleClientListView}>{t("accountPage.listClients.btn")}</button>
                      : ""}
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
