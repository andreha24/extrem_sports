import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Client = () => {
  const [userData, setUserData] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/unAuth/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="user-profile">
      sdasdasd
    </div>
  );
};

export default Client;
