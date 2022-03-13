import React, { useState, useEffect } from "react";
import StatusCard from "../../../components/status-card/StatusCardLesson";
import { Link } from "react-router-dom";
import LeconDataService from "../../../services/lecon.service";
import { useLocation } from "react-router-dom"; 

const LessonList = () => {
  const [lecons, setLecons] = useState([]);
  const { idUnit, idProjet } = useLocation();

  useEffect(() => {
    retrieveLecons();
  }, []);
  const retrieveLecons = () => {
    LeconDataService.getAll(idUnit)
      .then((response) => {
        setLecons(response.data);
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
              pathname: `/unit-list`,
              idProjet: idProjet,
              idUnit: idUnit,
            }}
          >
            <i className="bx bx-arrow-back"> </i>
          </Link>
        </div>
      </div>

        <div className="row">
          <div className="col-11">
            <h2 className="page-header">Ajouter lecon a l'unitée </h2>
          </div>
          <div className="col-4">
            <Link
              to={{
                pathname: `/add-lesson`,
                idProjet: idProjet,
                idUnit: idUnit,
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
            <h2 className="page-header">Lecons</h2>
            {Array.isArray(lecons) ? (
              <div>
                <div className="row">
                  {lecons &&
                    lecons.map((item, index) => (
                      <div className="col-4" key={index}>
                        <StatusCard 
                          icon={item.descrip}
                          idProjet={idProjet}
                          idUnit={idUnit}
                          idLecon={item.id}
                          descrip={item.descrip}
                          nom={item.nom}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <h4>Il n'y a pas d'unités</h4>
            )}
          </div>
        </div>
      </div>
  );
};

export default LessonList;
