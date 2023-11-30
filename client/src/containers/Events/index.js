import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
// import axios from "axios";

import Header from "../../components/Header";
import EventsList from "./EventsList";
import Filters from "../../components/Filters";
import EventFilters from "./EventFilters";
// import FormWrapper from "../../components/FormWrapper";
import Footer from "../../components/Footer";
// import FormField from "../../components/FormWrapper/Field";
import filterIcon from "../../assets/filter-icon.png";

import "./index.scss";

const Events = () => {
  const [viewFilters, setViewFilters] = useState(false);
  const [filters, setFilters] = useState({});
  // const [selectedFile, setSelectedFile] = useState(null);

  const toggleFilters = () => {
    setViewFilters((prev) => !prev);
  };

  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };
  //
  // const addEvent = (values) => {
  //   const eventData = {
  //     ...values,
  //     img: selectedFile.name,
  //   };
  //
  //   const formData = new FormData();
  //   formData.append("img", selectedFile);
  //
  //   axios
  //     .post("http://localhost:5000/events/addEvent", eventData)
  //     .then(() => {
  //       alert("Event add successful");
  //     })
  //     .catch((error) => {
  //       console.error("Error add event", error);
  //     });
  //
  //   axios
  //     .post("http://localhost:5000/bucket/addPhoto", formData)
  //     .then(() => {
  //       console.log("WOW");
  //     })
  //     .catch((error) => {
  //       console.error("Error registering user", error);
  //     });
  // };

  return (
    <>
      <Header />
      <div className="event-list-wrapper">
        <img src={filterIcon} onClick={toggleFilters} className="event-list-wrapper-img" alt="filter-icon" />
        <CSSTransition
          in={viewFilters}
          timeout={500}
          classNames="filter-mob-animation"
          unmountOnExit
        >
          <Filters className="filters-form__mobile" closeFilters={toggleFilters} updateFilters={setNewFilters}>
            <EventFilters />
          </Filters>
        </CSSTransition>
        <Filters className="filters-form__tablet" updateFilters={setNewFilters}>
          <EventFilters />
        </Filters>
        <EventsList filtersValues={filters} />
      </div>
      {/* <FormWrapper */}
      {/*  onSubmit={addEvent} */}
      {/*  paragraphName="Add event" */}
      {/* > */}
      {/*  <FormField */}
      {/*    name="name" */}
      {/*    type="text" */}
      {/*  /> */}
      {/*  <FormField */}
      {/*    name="description" */}
      {/*    type="text" */}
      {/*  /> */}
      {/*  <FormField */}
      {/*    name="continent" */}
      {/*    type="text" */}
      {/*  /> */}
      {/*  <FormField */}
      {/*    name="country" */}
      {/*    type="text" */}
      {/*  /> */}
      {/*  <FormField */}
      {/*    name="city" */}
      {/*    type="text" */}
      {/*  /> */}
      {/*  <FormField */}
      {/*    name="people" */}
      {/*    type="text" */}
      {/*  /> */}
      {/*  <FormField */}
      {/*    name="start_date" */}
      {/*    type="date" */}
      {/*  /> */}
      {/*  <input type="file" onChange={handleFileChange} name="preview" /> */}
      {/* </FormWrapper> */}
      <Footer />
    </>
  );
};

export default Events;
