import React, { useContext, useState } from "react";
import Button from "../components/button/Button";
import { Link } from "react-router-dom";
import UserDataService from "../services/user.service";
import { UserContext } from './UserContext';
import { useSessionStorage } from './useSessionStorage';

const Login = ( props ) => {
  const user = useContext(UserContext);
  const [nom, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setLoggin] = useSessionStorage('login', false);
  const [idUser, setIdUser] = useSessionStorage('idUser', 0);
  const [ nomUser, setNomUser] = useSessionStorage('nom', "");
  //const [nomUser, setNomUser] = useSessionStorage('nomUser', '');
 // const [nomUser, setNomUser] = useSessionStorage('nomUser', "");

// Deleting a user. 

  
  const loginFunction = () => {
    console.log(isLogged);
    UserDataService.login(nom, password)
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success) {
          user.setEtat(false)
          setLoggin(false);
          console.log("no se puede loggear");
        } else {
          user.setEtat(true)
          setLoggin(true);
          setIdUser(response.data["id"]);
          setNomUser(response.data["nom"]);
          //setNomUser(response.data["nomUser"]);
          window.location.reload(false);
          console.log("se puede loggear"); 
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <form className="center ">
        <h2 className="page-header">Login</h2>
        <div className="topnav__search">
          <input
            style={{ backgroundColor: "white" }}
            placeholder="Nom du projet"
            className="form-control"
            labelText="Username"
            required="required"
            onChange={(event) => setUsername(event.target.value)}
            id="username"
            name="username"
            type="text"
          />
        </div>
        <br /> <br />
        <div className="topnav__search">
          <input
            style={{ backgroundColor: "white" }}
            placeholder="Password"
            className="form-control"
            labelText="password"
            required="required"
            onChange={(event) => setPassword(event.target.value)}
            id="password"
            name="password"
            type="text"
          />
        </div>
        <Button
          type="button"
          color="danger"
          className="form__custom-button"
          onClick={loginFunction}
        >
          Log in
        </Button>
        <br />
        <br />
        <div style={{ color: "#6f7173" }}>
          Vous n'avez pas de compte ?{" "}
          <Link to={"/register"} style={{ color: "blue" }}>
            Créer une.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
