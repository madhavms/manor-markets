import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const useAuthentication = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const login = async ({ username, password, setErrorMessage }) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("sessionValidity", true);
        localStorage.setItem("AccessToken", JSON.stringify(data));
      } else {
        setErrorMessage(data.detail);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("AccessToken", "");
  };

  return { isLoggedIn, login, logout };
};

export default useAuthentication;
