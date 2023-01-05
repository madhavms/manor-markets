import React, { useEffect, useState } from "react";
import { accessTokenExpiryTime, refreshAccessToken } from "../utils/SessionUtils";

const useSession = ({ setTokenValidity }) => {
  const [timeRemaining, setTimeRemaining] = useState("00:00");

  useEffect(() => {
    const id = setInterval(() => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!!accessToken) {
        const { timeOutput, timeRemainingInSeconds } = accessTokenExpiryTime(accessToken);
        setTimeRemaining(timeOutput);
        setTokenValidity(true);

        if (timeRemainingInSeconds < 0 && !refreshToken) {
          localStorage.removeItem("accessToken");
          setTokenValidity(false);
          localStorage.removeItem("sessionValidity");
        } else if (timeRemainingInSeconds < 0 && !!refreshToken) {
          refreshAccessToken();
        }
      } else if (!accessToken && !!refreshToken) {
        refreshAccessToken();
      } else {
        localStorage.removeItem("accessToken");
        setTokenValidity(false);
        localStorage.removeItem("sessionValidity");
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return [timeRemaining];
};

export default useSession;
