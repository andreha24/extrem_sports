import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import Header from "../../components/Header";
import ClientsList from "./ClientsList";
import Filters from "../../components/Filters";
import ClientsFilters from "./ClientsFilters";
import Footer from "../../components/Footer";
import filterIcon from "../../assets/filter-icon.png";

import "./index.scss";

const Clients = () => {
  const [viewFilters, setViewFilters] = useState(false);
  const [userRole, setUserRole] = useState("athlete");
  const [filters, setFilters] = useState({});

  const toggleFilters = () => {
    setViewFilters((prev) => !prev);
  };

  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
  };
  return (
    <>
      <Header />
      <div className="user-list-wrapper">
        <img src={filterIcon} onClick={toggleFilters} className="event-list-wrapper-img" alt="filter-icon" />
        <CSSTransition
          in={viewFilters}
          timeout={500}
          classNames="filter-mob-animation"
          unmountOnExit
        >
          <Filters className="filters-form__mobile" closeFilters={toggleFilters} updateFilters={setNewFilters}>
            <ClientsFilters chooseRole={userRole} />
          </Filters>
        </CSSTransition>
        <Filters className="filters-form__tablet" updateFilters={setNewFilters}>
          <ClientsFilters chooseRole={userRole} />
        </Filters>
        <ClientsList filtersValues={filters} chooseRole={userRole} handleRole={handleRoleChange} />
      </div>
      <Footer />
    </>
  );
};

export default Clients;
