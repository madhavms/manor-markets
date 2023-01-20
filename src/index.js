import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./components/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const vitalParams = {FCP: 'First Contentful Paint', LCP: 'Largest Contentful Paint', FID: 'First Input Delay', CLS: 'Cumulative Layout Shift', TTFB: 'Time to First Byte'};
const logWebVitals = (metric) => console.log(`Web Vitals: ${vitalParams[metric.name]} Value = ${metric.value}ms`);
reportWebVitals(logWebVitals);
