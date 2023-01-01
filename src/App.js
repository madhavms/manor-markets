import "./App.css";
import ManorMarketsNavbar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import { Products, Contact } from "./components/ProductsContact";
import LoginScreen from "./components/Login";
import useAuthentication from "./hooks/useAuthentication";

function App() {
  const { isLoggedIn, login, logout } = useAuthentication();
  return (
    <BrowserRouter>
      <ManorMarketsNavbar {...{ isLoggedIn, logout }} />
      {isLoggedIn ? (
        <Routes>
          <Route exact path="*" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<LoginScreen login={login} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
