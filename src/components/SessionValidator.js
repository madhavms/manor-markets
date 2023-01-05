import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SessionValidator = ({ children }) => {
  const { tokenValidity } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenValidity) {
      navigate("/login");
    }
  }, [tokenValidity]);
  return children;
};

export default SessionValidator;
