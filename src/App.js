import "./App.css";
import ManorMarketsNavbar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import { Products, Contact } from "./components/ProductsContact";
import LoginScreen from "./components/Login";
import useAuthentication from "./hooks/useAuthentication";
import { useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import SessionValidator from "./components/SessionValidator";

function App() {
  const { login, logout, error } = useAuthentication();
  const { tokenValidity, timeRemaining } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <ManorMarketsNavbar
        {...{logout, tokenValidity, timeRemaining }}
      />
      {tokenValidity ? (
        <Routes>
          <Route exact path="*" element={<SessionValidator><Home /></SessionValidator>} />
          <Route exact path="/about" element={<SessionValidator><About /></SessionValidator>} />
          <Route exact path="/products" element={<SessionValidator><Products /></SessionValidator>} />
          <Route exact path="/contact" element={<SessionValidator><Contact /></SessionValidator>} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="*"
            element={<LoginScreen login={login} error={error} />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
