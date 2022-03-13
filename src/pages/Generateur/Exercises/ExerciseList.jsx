import React, { useState, useEffect } from "react";
import StatusCard from "../../../components/status-card/StatusCardExercise";
import { Link } from "react-router-dom";
import ActiviteDataService from "../../../services/activite.service";
import { useLocation } from "react-router-dom";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const { idUnit, idProjet, idLecon } = useLocation();

  useEffect(() => {
    retrieveExercises();
  }, []);
  const retrieveExercises = () => {
    ActiviteDataService.getAll(idLecon)
      .then((response) => {
        setExercises(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div
        className="col-12"
        style={{ display: "flex", justifyContent: "right" }}
      >
        <div className="status-card__icon-plus-add">
          <Link
            to={{
              pathname: `/lesson-list`,
              idProjet: idProjet,
              idUnit: idUnit,
              idLecon: idLecon,
            }}
          >
            <i className="bx bx-arrow-back"> </i>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-11">
          <h2 className="page-header">Ajouter un exercise a la lesson </h2>
        </div>
        <div className="col-4">
          <Link
            to={{
              pathname: `/add-exercise`,
              idProjet: idProjet,
              idUnit: idUnit,
              idLecon: idLecon,
            }}
          >
            <div
              className="status-card"
              style={{ border: "dotted 4px #808080 " }}
            >
              <div className="status-card__icon-plus">
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12">
          <h2 className="page-header">Exercises</h2>
          {Array.isArray(exercises) ? (
            <div>
              <div className="row">
                {exercises &&
                  exercises.map((item, index) => (
                    <div className="col-4" key={index}>
                      <StatusCard
                        icon={item.descrip}
                        idProjet={idProjet}
                        idUnit={idUnit}
                        idLecon={idLecon}
                        idExercise={item.id}
                        descrip={item.descrip}
                        nom={item.nom}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <h4>Il n'y a pas d'activitées</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;
