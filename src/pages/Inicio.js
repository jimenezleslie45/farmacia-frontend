import React from "react";
import Sidebar from "../Componentes/Sidebar";
import logo from "../assets/logo_farmacia.png"; // asegúrate que el nombre coincida
import "./Inicio.css";

function Inicio() {
  return (
    <div className="contenedor">
      <Sidebar />
      <div className="contenido-inicio">
        <div className="texto-bienvenida">
          <h1>Bienvenido al Sistema de Gestión de Farmacia</h1>
          <p>Seleccione una opción del menú lateral.</p>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Logo Farmacia" className="logo-inicio" />
        </div>
      </div>
    </div>
  );
}

export default Inicio;
