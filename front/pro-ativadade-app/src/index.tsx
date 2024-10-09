import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/Menu";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';


const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Router>
      <Menu />
      <div className="container">
        <App />
      </div>
    </Router>
  );
} else {
  console.error("Root element not found.");
}