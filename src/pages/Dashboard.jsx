import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import statusCards from "../assets/JsonData/status-card-data.json";
import { useSessionStorage } from '../pages/useSessionStorage';
import ProjetDataService from "../services/projet.service";
import UnitDataService from "../services/unit.service";
import LeconDataService from "../services/lecon.service";
import ActiviteDataService from "../services/activite.service";


const Dashboard = () => {
  const [isLogged, setLoggin] = useSessionStorage('login', false);
  const [idUser, setIdUser] = useSessionStorage('idUser', 0);
  const [nomUser, setNomUser] = useSessionStorage('nom', 0);
  const [projets, setProjets] = useState([]);
  const [units, setUnits] = useState([]);
  const [lecons, setLecons] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    retrieveProjets();
    retrieveUnits();
    retrieveLecons();
    retrieveActivities();
  }, []);
  const retrieveLecons = () => {
    LeconDataService.getAllLecons()
      .then((response) => {
        setLecons(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveActivities = () => {
    ActiviteDataService.getAllActivities()
      .then((response) => {
        setActivities(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveProjets = () => {
    ProjetDataService.getAllProjets()
      .then((response) => {
        setProjets(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveUnits = () => {
    UnitDataService.getAllUnits()
      .then((response) => {
        setUnits(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-9">
          <h2 className="page-header"> À propos... </h2>{" "}
        </div>
        <div
          className={`col-3 sidebar__item-inner active`}
          style={{ display: "flex", marginLeft: "auto" }}
        >
          <i class="bx bx-plus"></i>
          <Link to={"/generateur"}>
            <h3>Créer projet</h3>
          </Link>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-12">
          <div className="row">
           
              <div className="col-6" >
                <StatusCard
                  icon={"bx bx-receipt"}
                  count={projets.length}
                  title={"Projets en total"}
                />
              </div>

              <div className="col-6" >
                <StatusCard
                  icon={"bx bx-receipt"}
                  count={units.length}
                  title={"Unitées en total"}
                />
              </div>

              <div className="col-6" >
                <StatusCard
                  icon={"bx bx-receipt"}
                  count={lecons.length}
                  title={"Lecons en total"}
                />
              </div>

              <div className="col-6" >
                <StatusCard
                  icon={"bx bx-receipt"}
                  count={activities.length}
                  title={"Activitées en total"}
                />
              </div>

          </div>
        </div>

        <h2 className="page-header">Présentation du projet</h2>

        <div className="col-8"></div>
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
