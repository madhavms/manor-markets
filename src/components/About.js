import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>This is the about component.</p>
    </div>
  );
}

export default About;
