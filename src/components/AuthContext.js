import React, { createContext, useRef, useState } from "react";
import jwtDecode from "jwt-decode";

// creating context
export const AuthContext = createContext();

const isTokenValid = (accessToken) => {
    console.log(accessToken)
    if (!accessToken) return false;
    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      // The token has expired, so prompt the user to log in again
      return false;
    }
    return true;
  };

export const AuthContextProvider = (props) => {
  const accessToken = localStorage.getItem("AccessToken");
  const isValid = isTokenValid(accessToken);;
  const [tokenValidity, setTokenValidity] = useState(isValid || false);
  const [isLoggedIn, setIsLoggedIn] = useState(tokenValidity || false);
  

  return (
    <AuthContext.Provider
      value={[isLoggedIn, setIsLoggedIn, tokenValidity]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
