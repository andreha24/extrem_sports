import React from "react";
import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";

import "./index.scss";

const PostForm = React.memo(({
  changeFormView, onSubmit, initialValues, buttonName,
}) => (
  <Form
    initialValues={initialValues}
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} className="post-form">
        <button type="button" onClick={changeFormView} className="post-form-close-btn">X</button>
        <div className="post-form-item">
          <span>Topic:</span>
          <Field
            name="topic"
            component="textarea"
            rows="5"
            cols="33"
            placeholder="your topic..."
          />
        </div>
        <div className="post-form-item">
          <span>Text:</span>
          <Field
            name="text"
            component="textarea"
            rows="5"
            cols="33"
            placeholder="your text..."
          />
        </div>

        <button type="submit" className="send-post-btn">{buttonName}</button>
      </form>
    )}
  />
));

PostForm.propTypes = {
  changeFormView: PropTypes.func,
  onSubmit: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object,
  buttonName: PropTypes.string,
};

export default PostForm;
