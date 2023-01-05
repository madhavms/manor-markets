import React, { createContext, useRef, useState } from "react";
import useSession from "../hooks/useSession";

// creating context
export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [tokenValidity, setTokenValidity] = useState(
    localStorage.getItem("sessionValidity") || false
  );

  const [timeRemaining] = useSession({
    tokenValidity,
    setTokenValidity
  });
  return (
    <AuthContext.Provider
      value={{tokenValidity, timeRemaining }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
