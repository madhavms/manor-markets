import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./AuthContext";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn, tokenValidity] = useContext(AuthContext);

  useEffect(() => {
    const id = setInterval(() => {
      // Decode the access token to get the payload
      const accessToken = localStorage.getItem("AccessToken");
      if (!!accessToken) {
        const decodedToken = jwtDecode(accessToken);
        console.log(decodedToken.exp * 1000 - Date.now());
        // Check the exp claim to see if the token has expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // The token has expired, so log out the user
          localStorage.removeItem("AccessToken");
          setIsLoggedIn(false);
          navigate("/login");
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="home-container">
      <h1>Welcome to the Home page!</h1>
      <p>This is the home component.</p>
    </div>
  );
}

export default Home;
