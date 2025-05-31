import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="logo">
          💊 <span className="logo-text">Farmacia Tu Salud</span>
        </div>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/inventory">Inventario</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/sales">Ventas</Link></li>
          <li><Link to="/medicines">Medicinas</Link></li>
          <li><Link to="/batches">Lotes</Link></li>
          <li><Link to="/entries">Entradas</Link></li>
          <li><Link to="/exits">Salidas</Link></li>
          <li><Link to="/billing">Facturación</Link></li>
          <li><Link to="/cart">Carrito de Compras</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Bienvenido al sistema de gestión de farmacia</h1>
      </div>
    </div>
  );
};

export default Dashboard;


