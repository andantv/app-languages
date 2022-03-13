import React from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";

import "./statuscard.css";

const StatusCardProjet = (props) => {
  return (
    <div className="status-card">
      <div className="status-card__icon">
        <i className="bx bx-receipt"></i>
      </div>
      <div className="status-card__info">
        <h4>{props.nom}</h4>
        <span>{props.descrip}</span> <br />
        <Link
          to={{
            pathname: `/lesson-list`,
            idUnit: props.idUnit,
            idProjet: props.idProjet,
          }}
        >
          {" "}
          <Button type="button" color="success" className="form__custom-button">
            Voir unit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StatusCardProjet;
