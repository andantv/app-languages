import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import "./AddProjet.css";
import { useSessionStorage } from '../../../useSessionStorage';
import ProjetDataService from "../../../../services/projet.service";

const AddProjet = (props) => {
  const initialProjetState = { 
    id: "",
    nom: "",
    descrip: "",
    langueId: "",
    userId: "",
  };

  const [projet, setProjet] = useState(initialProjetState);
  const [submitted, setSubmitted] = useState(false);
  const [idUser, setIdUser] = useSessionStorage('idUser', 0);

  console.log(idUser);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjet({ ...projet, [name]: value });
  };

  const saveProjet = () => {
    var data = {
      id: 1,
      nom: projet.nom,
      descrip: projet.descrip,
      langueId: projet.langueId,
      userId: idUser,
    };
    ProjetDataService.create(data)
      .then((response) => {
        setProjet({
          id: response.data.id,
          nom: response.data.nom,
          descrip: response.data.descrip,
          langueId: response.data.langueId,
          userId: response.data.userId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newProjet = () => {
    setProjet(initialProjetState);
    setSubmitted(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <div className="status-card__icon-plus-add">
          <Link to="/generateur">
            <i className="bx bx-arrow-back"></i>
          </Link>
        </div>
      </div>

      {submitted ? (
        <div>
          <h4>Vous avez soumis avec succès !</h4>
          <button className="btn btn-success" onClick={newProjet}>
            Ajouter
          </button>
        </div>
      ) : (
        <div className="col-6" style={{ width: "50%", margin: "0 auto" }}>
          <div className="card">
            <div className="card__header">
              <h2 style={{ textAlign: "center" }}>Ajouter projet</h2>
            </div>
            <div className="card__body">
              <Container>
                  <div className="topnav__search">
                    <input
                      style={{ backgroundColor: "white"}}
                      placeholder="Nom du projet"
                      className="form-control"
                      labelText="Nom du projet"
                      required="required"
                      value={projet.nom}
                      onChange={handleInputChange}
                      id="nom"
                      name="nom"
                      type="text"
                    />
                  </div>
                  <br /> <br />
                  <div className="topnav__search">
                    <input
                      style={{ backgroundColor: "white"}}
                      placeholder="Description du projet"
                      className="form-control"
                      labelText="Description du projet"
                      required="required"
                      value={projet.descrip}
                      onChange={handleInputChange}
                      id="descrip"
                      name="descrip"
                      type="text"
                    />
                  </div>
                  <br />
                  <div className="select">
                    <select
                      className="form-control"
                      name="langueId"
                      id="langueId"
                      value={projet.langueId}
                      onChange={handleInputChange}
                    >
                      <option value="1">Choisissez la langue</option>
                      <option value="2">Anglais</option>
                      <option value="3">Espagnol</option>
                      <option value="3">Zapoteco</option>
                    </select>
                  </div>
                  <div style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    color="danger"
                    className="form__custom-button"
                    onClick={saveProjet}
                  >
                    Créer un projet
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

export default AddProjet;
