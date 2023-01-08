import jwtDecode from "jwt-decode";

export const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch("http://localhost:8000/refresh-token", {
        method: "POST",
        body: JSON.stringify({ "refresh_token": refreshToken }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const {access_token} = data;
      localStorage.setItem('accessToken', access_token);
    } catch (error) {
      console.error(error);
    }
  };

  export const accessTokenExpiryTime = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    const timeRemainingInSeconds = ((decodedToken.exp * 1000) - Date.now()) / 1000;
    let minutes = Math.floor(timeRemainingInSeconds / 60);
    let seconds = Math.floor(timeRemainingInSeconds % 60);
    minutes = minutes < 0 ? 0 : minutes;
    seconds = seconds < 0 ? 0 : seconds;
    const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`
    const minuteString = minutes < 10 ? `0${minutes}` : `${minutes}`
    const timeOutput = `${minuteString}:${secondString}`;
    return {timeOutput,timeRemainingInSeconds}
  }