import React from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";

import "./statuscard.css";

const StatusCardLesson = (props) => {
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
            pathname: `/exercise-list`,
            idProjet: props.idProjet,
            idUnit: props.idUnit,
            idLecon: props.idLecon,
          }}
        >
          {" "}
          <Button type="button" color="success" className="form__custom-button">
            Voir Lesson
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StatusCardLesson;
