import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VocabulaireDataService from "../../../services/vocabulaire.service";
import { useLocation } from "react-router-dom";
import { Provider } from "../../../Context";
import Form from "./Form";
import VocabulaireList from "./VocabulaireList";
import { Actions } from "./Actions";
import "./Vocabulaire.css";
import Button from "../../../components/button/Button";


const ExerciseList = () => {

  const { idUnit, idProjet, idLecon, idExercise } = useLocation();
  const data = Actions(idExercise);


  return (
    <div>
      <div
        className="col-12"
        style={{ display: "flex", justifyContent: "right" }}
      >
        <div className="status-card__icon-plus-add">
          <Link
            to={{
              pathname: `/exercise-list`,
              idProjet: idProjet,
              idUnit: idUnit,
              idLecon: idLecon,
              idExercise: idExercise,
            }}
          >
            <i className="bx bx-arrow-back"> </i>
          </Link>
        </div>
      </div>

      <Provider value={data}>
      <div className="App">
        <h1>Mon vocabulaire</h1>
        <div className="wrapper">
          <section className="left-side">
            <Form />
          </section>
          <section className="right-side">
            <VocabulaireList />
          </section>
          <Link             to={{
              pathname: `/game`,
              idProjet: idProjet,
              idUnit: idUnit,
              idLecon: idLecon,
              idExercise: idExercise,
            }}>

              <div  style={{ textAlign: "center"}}  >
              <Button
                    type="button"
                    color="primary"
                    className="form__custom-button"
                             
                  >
                    Jouer
                  </Button>
              </div>
          
          </Link>
        </div>
      </div>
    </Provider>
    </div>
    
  );
};

export default ExerciseList;
