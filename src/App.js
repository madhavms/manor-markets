import "./App.css";
import ManorMarketsNavbar from "./components/NavBar";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import {Products,Contact} from "./components/ProductsContact";


function App() {
  return (
    <BrowserRouter>
      <ManorMarketsNavbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
