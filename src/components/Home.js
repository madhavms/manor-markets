import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn, tokenValidity] = useContext(AuthContext);

  useEffect(() => {
    if (!tokenValidity && !isLoggedIn) navigate("/login");
  }, [tokenValidity]);

  return (
    <div className="home-container">
      <h1>Welcome to the Home page!</h1>
      <p>This is the home component.</p>
    </div>
  );
}

export default Home;
