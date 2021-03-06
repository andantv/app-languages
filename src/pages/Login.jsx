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
  const [fields, setFields] = useState("");
  const [errors, setErrors] = useState({});
  const [formIsValid, setfFrmIsValid] = useState(true);

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

  function handleValidation() {


    //Name
    if (!fields["username"]) {
      setfFrmIsValid(false);
      setErrors({
        name: "Cannot be empty"
      });
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z]+$/)) {
        setfFrmIsValid(false);
        setErrors({
          name: "Only letters"
        });
      }
    }

    return errors;
  }
  



  return (
    <div>
      <form className="center ">
        <h2 className="page-header">Login</h2>
        <div className="topnav__search">
          <input
            style={{ backgroundColor: "white" }}
            placeholder="Username"
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
            type="password"
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
            Cr??er une.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
