import { createContext, useState } from "react";
export const UserContext = createContext();


// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [etat, setEtat] = useState(false);
  const [idUser, setIdUser] = useState('');

  return (
    <UserContext.Provider
      value={{
        etat,
        setEtat,
      }}
    >
        
      {children}
    </UserContext.Provider>
  );
};