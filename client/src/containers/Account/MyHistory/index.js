import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import HistoryForm from "./HistoryForm";
import formatDate from "../../../utils/formatDate";
import toastSuccess from "../../../utils/toast/toastSuccess";

import "./index.scss";

const MyHistory = ({ sportType }) => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const [history, setHistory] = useState([]);
  const [viewHistoryForm, setViewHistoryForm] = useState(false);
  const [maxResultId, setMaxResultId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/userHistory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setHistory(response.data);

        const maxResult = Math.max(...response.data.map((item) => item.result));
        const maxResultItem = response.data.find((item) => item.result === maxResult);
        setMaxResultId(maxResultItem.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const deleteResult = (id) => {
    axios.delete(`http://localhost:5000/api/deleteResult/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toastSuccess(response.data);
        setHistory((prev) => prev.filter((result) => result.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHistoryView = () => {
    setViewHistoryForm((prev) => !prev);
  };

  const changeHistoryList = (newResult) => {
    setHistory((prev) => [newResult, ...prev]);

    if (newResult.result > Math.max(...history.map((item) => item.result))) {
      setMaxResultId(newResult.id);
    }
  };

  return (
    <div className="history-wrapper">
      {history.length === 0 ? (
        <p>{t("accountPage.history.emptyHistory")}</p>
      ) : (
        <>
          <span>
            {t("accountPage.history.yourResults")}
            {" "}
            {sportType}
          </span>
          <table className="history-table">
            <thead>
              <tr>
                <th>{t("accountPage.history.results")}</th>
                <th>{t("accountPage.history.date")}</th>
              </tr>
            </thead>
            <tbody>
              {history.map(({ id, result, dateOfTrain }) => (
                <tr key={id} style={{ background: id === maxResultId ? "lightgreen" : "" }}>
                  <td>{result}</td>
                  <td>{formatDate(dateOfTrain)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteResult(id)}
                    >
                      {t("accountPage.history.delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {viewHistoryForm
        ? <HistoryForm changeHistoryList={changeHistoryList} closeList={changeHistoryView} />
        : <button type="button" onClick={changeHistoryView}>{t("accountPage.history.crateResult")}</button>}
    </div>
  );
};

MyHistory.propTypes = {
  sportType: PropTypes.string,
};

export default MyHistory;
