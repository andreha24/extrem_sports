import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

const RegUsersList = ({ users }) => (
  users?.map(({ id, name, lastname }) => (
    <div key={id} className="registered-user">
      <div>
        <span>{name}</span>
        <span className="registered-user-lastname">{lastname}</span>
      </div>
      <Link to={`/clients/${id}`}>See profile</Link>
    </div>
  ))
);

RegUsersList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array,
};

export default RegUsersList;
