import React, { useContext, useState } from "react";
import CustomInput from "../components/customImput/CustomImput";
import Button from "../components/button/Button";
import { Link } from 'react-router-dom'
import UserDataService from "../services/user.service";
import { Container } from "@material-ui/core";


const Register = () => {
  const initialUserState = { 
    id: "",
    nom: "",
    prenom: "",
    email: "",
    nomUtilisateur: "",
    motDePasse: "",
  };

  const [utilisateur, setUtilisateur] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUtilisateur({ ...utilisateur, [name]: value });
  };

  const saveUtilisateur = () => {
    var data = {
      id: 1,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      nomUtilisateur: utilisateur.nomUtilisateur,
      motDePasse: utilisateur.motDePasse,
    };
    UserDataService.create(data)
      .then((response) => {
        setUtilisateur({
          id: response.data.id,
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          nomUtilisateur: response.data.nomUtilisateur,
          motDePasse: response.data.motDePasse,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newUtilisateur = () => {
    setUtilisateur(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="">
      <form className=" center">
        <h2 className="page-header">Register</h2>
        {submitted ? (
        <div>
          <h4>Vous avez soumis avec succès !</h4>
          <button className="btn btn-success" onClick={newUtilisateur}>
            Ajouter
          </button>
        </div>
      ) : (
          <div>
                   <div className="topnav__search">
                    <input
                      style={{ backgroundColor: "white"}}
                      placeholder="Nom"
                      className="form-control"
                      labelText="Nom"
                      required="required"
                      value={utilisateur.nom}
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
                      placeholder="prenom"
                      className="form-control"
                      labelText="prenom"
                      required="required"
                      value={utilisateur.prenom}
                      onChange={handleInputChange}
                      id="prenom"
                      name="prenom"
                      type="text"
                    />
                  </div>
                  <br /> <br />
                  <div className="topnav__search">
                    <input
                      style={{ backgroundColor: "white"}}
                      placeholder="Email"
                      className="form-control"
                      labelText="email"
                      required="required"
                      value={utilisateur.email}
                      onChange={handleInputChange}
                      id="email"
                      name="email"
                      type="text"
                    />
                  </div>
                  <br /> <br />
                  <div className="topnav__search">
                    <input
                      style={{ backgroundColor: "white"}}
                      placeholder="Nom utilisateur"
                      className="form-control"
                      labelText="nom utilisateur"
                      required="required"
                      value={utilisateur.nomUtilisateur}
                      onChange={handleInputChange}
                      id="nomUtilisateur"
                      name="nomUtilisateur"
                      type="text"
                    />
                  </div>
                  <br /> <br />
                  <div className="topnav__search">
                    <input
                      style={{ backgroundColor: "white"}}
                      placeholder="Mot de passe"
                      className="form-control"
                      labelText="mot De Passe"
                      required="required"
                      value={utilisateur.motDePasse}
                      onChange={handleInputChange}
                      id="motDePasse"
                      name="motDePasse"
                      type="password"
                    />
                  </div>
                  
                  <div style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    color="danger"
                    className="form__custom-button"
                    onClick={saveUtilisateur}
                  >
                    Ajouter Utilisateur
                  </Button>
                  </div>
            </div>
      )}
        <br />
        <br />
        <div style={{ color: '#6f7173' }}>Avez-vous déjà un compte? <Link to={"/login"} style={{ color: 'blue' }}>Accéder.</Link ></div>
      </form>
    </div>
  );
};

export default Register;
