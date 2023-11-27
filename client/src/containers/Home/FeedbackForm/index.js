import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";

import paperPlane from "../../../assets/paper-plane.png";

import "./index.scss";

const FeedbackForm = () => {
  const token = localStorage.getItem("token");

  const sendFeedback = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/addCommentToService", { text: values.feedback }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Feedback sent successfully");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You need to log in");
      } else {
        console.error("Error sending feedback:", error);
      }
    }
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
