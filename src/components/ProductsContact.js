import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";


export function Products() {
  const navigate = useNavigate();
  const {tokenValidity} = useContext(AuthContext);

  useEffect(() => {
    if (!tokenValidity) navigate("/login");
  }, [tokenValidity]);
  return (
    <div className="products-container">
      <h1>Products</h1>
      <p>This is the products component.</p>
    </div>
  );
}

export function Contact() {
  const navigate = useNavigate();
  const {tokenValidity} = useContext(AuthContext);

  useEffect(() => {
    if (!tokenValidity) navigate("/login");
  }, [tokenValidity]);
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <p>This is the contact component.</p>
    </div>
  );
}

