import React, { useState } from "react";
import Sidebar from "../Componentes/Sidebar";
import "./Carrito.css";

function Carrito() {
  const [productos, setProductos] = useState([]); // Vacío al inicio
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    cantidad: 1,
  });

  const agregarProducto = () => {
    if (nuevoProducto.nombre && nuevoProducto.precio) {
      setProductos([
        ...productos,
        {
          id: Date.now(),
          nombre: nuevoProducto.nombre,
          precio: parseFloat(nuevoProducto.precio),
          cantidad: parseInt(nuevoProducto.cantidad),
        },
      ]);
      setNuevoProducto({ nombre: "", precio: "", cantidad: 1 });
    }
  };

  const incrementarCantidad = (id) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  };

  const decrementarCantidad = (id) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const total = productos.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="contenedor">
      <Sidebar />
      <div className="contenido">
        <h1>Carrito de Compras</h1>

        {/* Formulario para agregar productos */}
        <div className="formulario">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoProducto.nombre}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
            }
          />
          <button onClick={agregarProducto}>Agregar</button>
        </div>

        {/* Tabla de productos en el carrito */}
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>Q{producto.precio.toFixed(2)}</td>
                <td>
                  <button onClick={() => decrementarCantidad(producto.id)}>-</button>
                  {producto.cantidad}
                  <button onClick={() => incrementarCantidad(producto.id)}>+</button>
                </td>
                <td>Q{(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td>
                  <button className="eliminar" onClick={() => eliminarProducto(producto.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Total: Q{total.toFixed(2)}</h2>
        <button className="pagar">Pagar</button>
      </div>
    </div>
  );
}

export default Carrito;

