import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Home page!</h1>
      <p>This is the home component.</p>
    </div>
  );
}

export default Home;
