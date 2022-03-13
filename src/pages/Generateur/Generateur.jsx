import React, { useState, useEffect } from "react";
import StatusCard from "../../components/status-card/StatusCardProjet";
import { Link } from "react-router-dom";
import ProjetDataService from "../../services/projet.service";
import { useSessionStorage } from '../useSessionStorage';


const Generateur = () => {
  const [idUser, setIdUser] = useSessionStorage('idUser', 0);
  console.log(idUser);
  const [projets, setProjets] = useState([]);
  useEffect(() => {
    retrieveProjets();
  }, []);
  const retrieveProjets = () => {
    ProjetDataService.getAll(idUser)
      .then((response) => {
        setProjets(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h2 className="page-header">Generateur</h2>
      <div className="row">
        <div className="col-4">
          <Link to="/add-projet">
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
          <h2 className="page-header">Mes projets</h2>
          {Array.isArray(projets) ? (
            <div>
              <div className="row">
                {projets &&
                  projets.map((item, index) => (
                    <div className="col-4" key={index}>
                      <StatusCard
                        icon={item.descrip}
                        id={item.id}
                        nom={item.nom}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <h4>Il n'y a pas de projets</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generateur;
