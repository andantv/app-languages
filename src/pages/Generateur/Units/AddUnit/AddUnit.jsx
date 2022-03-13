import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import { useLocation } from "react-router-dom";

import "./AddUnit.css";

import UnitDataService from "../../../../services/unit.service";

const AddUnit = () => {
  const initialUnitState = {
    id: "",
    num: "",
    nom: "",
    descrip: "",
    publicId: "",
    niveauId: "",
    projetId: "",
  };

  const [unit, setUnit] = useState(initialUnitState);
  const [submitted, setSubmitted] = useState(false);
  const { idProjet } = useLocation();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUnit({ ...unit, [name]: value });
  };

  const saveUnit = () => {
    var data = {
      id: 1,
      num: unit.num,
      nom: unit.nom,
      descrip: unit.descrip,
      publicId: 1,
      niveauId: unit.niveauId,
      projetId: idProjet,
    };
    UnitDataService.create(data)
      .then((response) => {
        setUnit({
          id: response.data.id,
          num: response.data.num,
          nom: response.data.nom,
          descrip: response.data.descrip,
          publicId: response.data.publicId,
          niveauId: response.data.niveauId,
          projetId: response.data.projetId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newUnit = () => {
    setUnit(initialUnitState);
    setSubmitted(false);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <div className="status-card__icon-plus-add">
          <Link
            to={{
              pathname: `/unit-list`,
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
          <Button className="btn btn-success" onClick={newUnit}>
            Ajouter
          </Button>
        </div>
      ) : (
        <div className="col-6" style={{ width: "50%", margin: "0 auto" }}>
          <div className="card">
            <div className="card__header">
              <h2 style={{ textAlign: "center" }}>Ajouter unitée</h2>
            </div>
            <div className="card__body">
              <Container>
                <div className="topnav__search">
                  <input
                    style={{ backgroundColor: "white" }}
                    placeholder="Num unitée"
                    className="form-control"
                    required="required"
                    value={unit.num}
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
                    placeholder="Nom unitée"
                    className="form-control"
                    required="required"
                    value={unit.nom}
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
                    placeholder="Description unitée"
                    className="form-control"
                    required="required"
                    value={unit.descrip}
                    onChange={handleInputChange}
                    id="descrip"
                    name="descrip"
                    type="text"
                  />
                </div>
                <br /> <br />
                <div className="select">
                  <select
                    className="form-control"
                    name="niveauId"
                    id="niveauId"
                    value={unit.niveauId}
                    onChange={handleInputChange}
                  >
                    <option value="7">Choisissez niveau</option>
                    <option value="1">A1</option>
                    <option value="2">A2</option>
                    <option value="3">B1</option>
                    <option value="4">B2</option>
                    <option value="5">C1</option>
                    <option value="6">C2</option>
                  </select>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    color="danger"
                    className="form__custom-button"
                    onClick={saveUnit}
                  >
                    Create projet
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

export default AddUnit;
