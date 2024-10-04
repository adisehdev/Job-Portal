import { useState, createContext, useEffect } from "react";



export const Context = createContext({
  isAuthorized: false, //default
  
});

const ContextProvider = ({ children }) => {
  

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
