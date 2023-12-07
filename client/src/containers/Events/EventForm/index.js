import React, { useState } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";

import FormField from "../../../components/FormWrapper/Field";
import required from "../../../utils/validators/isRequired";
import generateUniqueFileName from "../../../utils/generateUniqueFileName";
import toastSuccess from "../../../utils/toast/toastSuccess";
import toastError from "../../../utils/toast/toastError";

import "./index.scss";

const EventForm = ({ changeFormView }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const changeContinent = (value) => {
    setSelectedContinent(value);
  };

  const addEvent = (values) => {
    const eventData = {
      ...values,
      img: generateUniqueFileName(selectedFile.name),
    };

    const formData = new FormData();
    formData.append("img", selectedFile, eventData.img);

    axios
      .post("http://localhost:5000/events/addEvent", eventData)
      .then((response) => {
        changeFormView();
        toastSuccess(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        toastError("???");
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
    <>
      <ToastContainer />
      <Form
        onSubmit={addEvent}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="event-form">
            <button type="button" onClick={changeFormView}>X</button>
            <FormField
              name="name"
              type="text"
              validators={required}
            />
            <FormField
              name="description"
              type="text"
              validators={required}
            />
            <Field
              name="continent"
              component="select"
              validate={required}
              initialValue={selectedContinent}
              onChange={(event) => { changeContinent(event.target.value); }}
            >
              <option value="" disabled>Continent</option>
              <option value="eurasia">Eurasia</option>
              <option value="north_america">North America</option>
              <option value="south_america">South America</option>
              <option value="australia">Australia</option>
              <option value="africa">Africa</option>
            </Field>
            <FormField
              name="country"
              type="text"
              validators={required}
            />
            <FormField
              name="city"
              type="text"
              validators={required}
            />
            <FormField
              name="people"
              type="text"
              validators={required}
            />
            <FormField
              name="start_date"
              type="date"
              validators={required}
            />
            <input type="file" onChange={handleFileChange} name="preview" required />

            <button type="submit">Add event</button>
          </form>
        )}
      />
    </>
  );
};

EventForm.propTypes = {
  changeFormView: PropTypes.func,
};

export default EventForm;
