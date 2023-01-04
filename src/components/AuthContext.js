import React, { createContext, useRef, useState } from "react";
import useSession from "../hooks/useSession";

// creating context
export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [tokenValidity, setTokenValidity] = useState(
    localStorage.getItem("sessionValidity") || false
  );
  const [isLoggedIn, setIsLoggedIn] = useState(tokenValidity || false);
  const [timeRemaining] = useSession({
    tokenValidity,
    setTokenValidity,
    setIsLoggedIn,
  });
  console.log(timeRemaining, "remain");
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, tokenValidity, timeRemaining }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
