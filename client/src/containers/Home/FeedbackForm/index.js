import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";

import paperPlane from "../../../assets/paper-plane.png";

import "./index.scss";

const FeedbackForm = () => {
  const token = localStorage.getItem("token");
  const sendFeedback = (text) => {
    axios.post("http://localhost:5000/api/addCommentToService", text, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        alert("Feedback sent successful");
      })
      .catch((error) => {
        console.error("Error send feedback", error);
      });
  };

  return (
    <div className="feedback-form-wrapper">
      <Form
        onSubmit={sendFeedback}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="feedback-form">
            <span className="feedback-form-paragraph">Send feedback to our service</span>
            <Field name="feedback">
              {({ input, meta }) => (
                <div className="feedback-block">
                  <input
                    {...input}
                    placeholder="send feedback"
                    className="feedback-block-input"
                    type="text"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                  <button type="submit"><img src={paperPlane} alt="plane" /></button>
                </div>
              )}
            </Field>
          </form>
        )}
      />
    </div>
  );
};

export default FeedbackForm;
