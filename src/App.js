import "./App.css";
import ManorMarketsNavbar from "./components/NavBar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import { Products, Contact } from "./components/ProductsContact";
import LoginScreen from "./components/Login";
import useAuthentication from "./hooks/useAuthentication";
import { useContext } from "react";
import { AuthContext } from "./components/AuthContext";


function App() {
  const {login, logout, error} = useAuthentication();
  const [isLoggedIn, tokenValidity, timeRemaining] = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ManorMarketsNavbar {...{ isLoggedIn, logout, tokenValidity, timeRemaining }} />
      {isLoggedIn && tokenValidity ? (
        <Routes>
          <Route exact path="*" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<LoginScreen login={login} error={error} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
