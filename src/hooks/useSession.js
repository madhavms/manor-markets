import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const useSession = ({
  setTokenValidity,
  setIsLoggedIn,
}) => {

  const accessTokenExpiryTime = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    const timeRemainingInSeconds = ((decodedToken.exp * 1000) - Date.now()) / 1000;
    const minutes = Math.floor(timeRemainingInSeconds / 60);
    const seconds = Math.floor(timeRemainingInSeconds % 60);
    const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`
    const minuteString = minutes < 10 ? `0${minutes}` : `${minutes}`
    const timeOutput = `${minuteString}:${secondString}`;
    return {timeOutput,timeRemainingInSeconds}
  }

  const [timeRemaining, setTimeRemaining] = useState('00:00');
  useEffect(() => {
    const id = setInterval(() => {
      // Decode the access token to get the payload
      const accessToken = localStorage.getItem("AccessToken");
      if (!!accessToken) {
        const {timeOutput,timeRemainingInSeconds} = accessTokenExpiryTime(accessToken);
        setTimeRemaining(timeOutput);
        // Check the exp claim to see if the token has expired
        if (timeRemainingInSeconds < 0) {
          // The token has expired, so log out the user
          localStorage.removeItem("AccessToken");
          setTokenValidity(false);
          localStorage.removeItem("sessionValidity");
          setIsLoggedIn(false);
        } else {
          setTokenValidity(true);
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return [timeRemaining];
};

export default useSession;
