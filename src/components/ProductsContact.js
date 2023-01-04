import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";


export function Products() {
  return (
    <div className="products-container">
      <h1>Products</h1>
      <p>This is the products component.</p>
    </div>
  );
}

export function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <p>This is the contact component.</p>
    </div>
  );
}

