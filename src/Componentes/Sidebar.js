import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBoxes, FaPills, FaShoppingCart, FaSignOutAlt, FaFileInvoiceDollar, FaStore, FaWarehouse, FaTruckLoading, FaClipboardList, FaCashRegister } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="barra-lateral">
      <h2>Farmacia</h2>
      <ul>
        <li><Link to="/"><FaHome /> Inicio</Link></li>
        <li><Link to="/inventario"><FaWarehouse /> Inventario</Link></li>
        <li><Link to="/productos"><FaBoxes /> Productos</Link></li>
        <li><Link to="/ventas"><FaCashRegister /> Ventas</Link></li>
        <li><Link to="/medicinas"><FaPills /> Medicinas</Link></li>
        <li><Link to="/lotes"><FaClipboardList /> Lotes</Link></li>
        <li><Link to="/entradas"><FaTruckLoading /> Entradas</Link></li>
        <li><Link to="/salidas"><FaStore /> Salidas</Link></li>
        <li><Link to="/facturacion"><FaFileInvoiceDollar /> Facturación</Link></li>
        <li><Link to="/carrito"><FaShoppingCart /> Carrito de Compras</Link></li>
        <li><Link to="/login"><FaSignOutAlt /> Cerrar Sesión</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;