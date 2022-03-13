import React, { useState, useEffect } from "react";
import StatusCard from "../../../components/status-card/StatusCardUnit";
import { Link } from "react-router-dom";
import UnitDataService from "../../../services/unit.service";
import { useLocation } from "react-router-dom";

const UnitList = () => {
  const [units, setUnits] = useState([]);
  const { idProjet } = useLocation();

  useEffect(() => {
    console.log("primero");
    retrieveUnits();
  }, []);
  const retrieveUnits = () => {
    UnitDataService.getAll(idProjet)
      .then((response) => {
        setUnits(response.data);
        console.log(response.data);
        console.log(Array.isArray(response.data));
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
          <Link to="/generateur">
            <i className="bx bx-arrow-back"> </i>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-11">
          <h2 className="page-header">Ajouter unitee au projet </h2>
        </div>
        <div className="col-4">
          <Link
            to={{
              pathname: `/add-unit`,
              idProjet: idProjet,
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
          <h2 className="page-header">Unitees</h2>
          {Array.isArray(units) ? ( 
            <div>
              <div className="row">
                {units &&
                  units.map((item, index) => (
                    <div className="col-4" key={index}>
                      <StatusCard
                        icon={item.descrip}
                        idProjet={idProjet}
                        idUnit={item.id}
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

export default UnitList;
