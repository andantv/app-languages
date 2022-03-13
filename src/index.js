import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";

import Layout from "./components/layout/Layout.jsx";
import LayoutAuth from "./components/layout_auth/LayoutAuth.jsx";
import { UserProvider } from "./pages/UserContext";
import { useSessionStorage } from './pages/useSessionStorage';


const store = createStore(rootReducer);

document.title = "Language app f";

// This component updates with data from context
function App() {
  const [isLogged, setLoggin] = useSessionStorage('login', false);
  console.log(isLogged);
  if(isLogged){
    return <Layout />;
  }else{
    return <LayoutAuth />;
  }

  
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
      ,
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
