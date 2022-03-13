import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Button from "../../../../components/button/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./AddExercise.css";

import ActiviteDataService from "../../../../services/activite.service";

const AddExercise = () => {
  const initialExerciseState = {
    id: "",
    num: "",
    nom: "",
    descrip: "",
    instructions: "",
    grammaire: "",
    leconId: "",
    typeActiviteId: "",
  };

  const [exercise, setExercise] = useState(initialExerciseState);
  const [submitted, setSubmitted] = useState(false);
  const { idProjet, idUnit, idLecon } = useLocation();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExercise({ ...exercise, [name]: value });
  };

  const saveExercise = () => {
    var data = {
      id: 1,
      num: exercise.num,
      nom: exercise.nom,
      descrip: exercise.descrip,
      instructions: exercise.instructions,
      grammaire: exercise.grammaire,
      leconId: idLecon,
      typeActiviteId: 1,
    };
    ActiviteDataService.create(data)
      .then((response) => {
        setExercise({
          id: response.data.id,
          num: response.data.num,
          nom: response.data.nom,
          descrip: response.data.descrip,
          instructions: response.data.instructions,
          grammaire: response.data.grammaire,
          leconId: response.data.leconId,
          typeActiviteId: response.data.typeActiviteId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newExercise = () => {
    setExercise(initialExerciseState);
    setSubmitted(false);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <div className="status-card__icon-plus-add">
          <Link
            to={{
              pathname: `/exercise-list`,
              idUnit: idUnit,
              idProjet: idProjet,
              idLecon: idLecon,
            }}
          >
            <i class="bx bx-arrow-back"></i>
          </Link>
        </div>
      </div>

      {submitted ? (
        <div>
          <h4>Vous avez soumis avec succès !</h4>
          <Button className="btn btn-success" onClick={newExercise}>
            Ajouter
          </Button>
        </div>
      ) : (
        <div className="col-6" style={{ width: "50%", margin: "0 auto" }}>
          <div className="card">
            <div className="card__header">
              <h2 style={{ textAlign: "center" }}>Ajouter Exercise</h2>
            </div>
            <div className="card__body">
              <Container>
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Num Exercise"
                    className="form-control"
                    required="required"
                    value={exercise.num}
                    onChange={handleInputChange}
                    id="num"
                    name="num"
                    type="number"
                  />
                </div>
                <br /> <br />
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Nom exercise"
                    className="form-control"
                    required="required"
                    value={exercise.nom}
                    onChange={handleInputChange}
                    id="nom"
                    name="nom"
                    type="text"
                  />
                </div>
                <br /> <br />
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Description exercise"
                    className="form-control"
                    required="required"
                    value={exercise.descrip}
                    onChange={handleInputChange}
                    id="descrip"
                    name="descrip"
                    type="text"
                  />
                </div>
                <br /> <br />
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Instructions"
                    className="form-control"
                    required="required"
                    value={exercise.instructions}
                    onChange={handleInputChange}
                    id="instructions"
                    name="instructions"
                    type="text"
                  />
                </div>
                <br /> <br />
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Point grammaire"
                    className="form-control"
                    required="required"
                    value={exercise.grammaire}
                    onChange={handleInputChange}
                    id="grammaire"
                    name="grammaire"
                    type="text"
                  />
                </div>
                <br /> <br />
                
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    color="danger"
                    className="form__custom-button"
                    onClick={saveExercise}
                  >
                    Créer un exercice
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExercise;
