import React, {useContext} from "react";
import { AuthContext } from "../components/AuthContext";


const useAuthentication = () => {
  const accessToken = localStorage.getItem("AccessToken");
  const [isLoggedIn, setIsLoggedIn, tokenValidity] = useContext(AuthContext);

  const login = async ({ username, password, setErrorMessage }) => {
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
      console.log("Error:", data.detail);
      setErrorMessage(data.detail);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("AccessToken", '');
  };

  return { isLoggedIn, login, logout };
};

export default useAuthentication;
