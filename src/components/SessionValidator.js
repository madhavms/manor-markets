import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SessionValidator = ({ children }) => {
  const { isLoggedIn, tokenValidity } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenValidity && !isLoggedIn) {
      navigate("/login");
    }
  }, [tokenValidity, isLoggedIn]);
  return (children);
};

export default SessionValidator;
