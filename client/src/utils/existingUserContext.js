import React, { useState, createContext, useContext } from "react";

// initializing a new context for existing versus new users on HomePage
const ExistingUserContext = createContext();
// creating a custom hook - can immediately use the existingUserContext in other components (HomePage, Login, CreateUser)
export const useExistingUserContext = () => useContext(ExistingUserContext);

export default function ExistingUserProvider(props) {
  const [existingUser, setExistingUser] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  const toggleExistingUser = () => {
    return setExistingUser(!existingUser);
  };
  const setLogin = (b) => {
    return setLoggedIn(b);
  }
  

  return (
    <ExistingUserContext.Provider value={{ existingUser,loggedIn,setLogin, toggleExistingUser }}>
      {props.children}
    </ExistingUserContext.Provider>
  );
}
