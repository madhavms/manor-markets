const useAuthentication = () => {
  const login = async ({ username, password, setErrorMessage }) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const { access_token, refresh_token } = data;
      if (response.ok) {
        localStorage.setItem("sessionValidity", true);
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token.token);
      } else {
        setErrorMessage(data.detail);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("sessionValidity");
    localStorage.removeItem("refreshToken");
  };

  return { login, logout };
};

export default useAuthentication;
