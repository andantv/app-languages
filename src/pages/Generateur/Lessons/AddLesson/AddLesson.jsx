import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import { useLocation } from "react-router-dom";

import "./AddLesson.css";

import LeconDataService from "../../../../services/lecon.service";

const AddLesson = () => {
  const initialLeconState = {
    id: "",
    num: "",
    nom: "",
    breveDescrip: "",
    longueDescrip: "",
    uniteId: "",
    sujetId: "",
    audioVisuelId: "",
  };

  const [lecon, setLecon] = useState(initialLeconState);
  const [submitted, setSubmitted] = useState(false);
  const { idUnit, idProjet, } = useLocation();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLecon({ ...lecon, [name]: value });
  };

  const saveLecon = () => {
    var data = {
      id: 1,
      num: lecon.num,
      nom: lecon.nom,
      breveDescrip: lecon.breveDescrip,
      longueDescrip: lecon.longueDescrip,
      uniteId: idUnit,
      sujetId: lecon.sujetId,
      audioVisuelId: 1,
    };
    LeconDataService.create(data)
      .then((response) => {
        setLecon({
          id: response.data.id,
          num: response.data.num,
          nom: response.data.nom,
          breveDescrip: response.data.breveDescrip,
          longueDescrip: response.data.longueDescrip,
          uniteId: response.data.uniteId,
          sujetId: response.data.sujetId,
          audioVisuelId: response.data.audioVisuelId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newLecon = () => {
    setLecon(initialLeconState);
    setSubmitted(false);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <div className="status-card__icon-plus-add">
          <Link
            to={{
              pathname: `/lesson-list`,
              idUnit: idUnit,
              idProjet: idProjet,
            }}
          >
            <i class="bx bx-arrow-back"></i>
          </Link>
        </div>
      </div>

      {submitted ? (
        <div>
          <h4>Vous avez soumis avec succès !</h4>
          <Button className="btn btn-success" onClick={newLecon}>
            Ajouter
          </Button>
        </div>
      ) : (
        <div className="col-6" style={{ width: "50%", margin: "0 auto" }}>
          <div className="card">
            <div className="card__header">
              <h2 style={{ textAlign: "center" }}>Ajouter lecon</h2>
            </div>
            <div className="card__body">
              <Container>
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Num lecon"
                    className="form-control"
                    required="required"
                    value={lecon.num}
                    onChange={handleInputChange}
                    id="num"
                    name="num"
                    type="text"
                  />
                </div>
                <br /> <br />
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Nom lecon"
                    className="form-control"
                    required="required"
                    value={lecon.nom}
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
                    placeholder="Description lecon court"
                    className="form-control"
                    required="required"
                    value={lecon.breveDescrip}
                    onChange={handleInputChange}
                    id="breveDescrip"
                    name="breveDescrip"
                    type="text"
                  />
                </div>
                <br /> <br />
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Description lecon long"
                    className="form-control"
                    required="required"
                    value={lecon.longueDescrip}
                    onChange={handleInputChange}
                    id="longueDescrip"
                    name="longueDescrip"
                    type="text"
                  />
                </div>
                <br /> <br />
                <div className="select">
                  <select
                    className="form-control"
                    name="sujetId"
                    id="sujetId"
                    value={lecon.sujetId}
                    onChange={handleInputChange}
                  >
                    <option value="3">Choisissez sujet</option>
                    <option value="1">Salutations</option>
                    <option value="2">Vocabulaire</option>
                    <option value="3">Autre</option>
                  </select>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    color="danger"
                    className="form__custom-button"
                    onClick={saveLecon}
                  >
                    Create lecon
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

export default AddLesson;
