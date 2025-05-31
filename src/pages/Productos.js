import React, { useState } from "react";
import Sidebar from "../Componentes/Sidebar";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
  });
  const [editarProducto, setEditarProducto] = useState(null);

  const validarCampos = () => {
    const { nombre, categoria, precio, stock } = nuevoProducto;
    return nombre.trim() !== "" && categoria.trim() !== "" && precio > 0 && stock > 0;
  };

  const agregarProducto = () => {
    if (validarCampos()) {
      setProductos([
        ...productos,
        {
          id: productos.length + 1,
          nombre: nuevoProducto.nombre,
          categoria: nuevoProducto.categoria,
          precio: parseFloat(nuevoProducto.precio),
          stock: parseInt(nuevoProducto.stock),
        },
      ]);
      alert("✅ Producto agregado correctamente");
      setNuevoProducto({ nombre: "", categoria: "", precio: "", stock: "" });
    } else {
      alert("❌ Todos los campos son obligatorios y deben tener valores válidos.");
    }
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const editar = (producto) => {
    setEditarProducto(producto);
    setNuevoProducto(producto);
  };

  const guardarEdicion = () => {
    if (validarCampos()) {
      setProductos(
        productos.map((producto) =>
          producto.id === editarProducto.id ? { ...nuevoProducto, id: producto.id } : producto
        )
      );
      alert("✅ Producto editado correctamente");
      setEditarProducto(null);
      setNuevoProducto({ nombre: "", categoria: "", precio: "", stock: "" });
    } else {
      alert("❌ Todos los campos son obligatorios y deben tener valores válidos.");
    }
  };

  return (
    <div className="contenedor">
      <Sidebar />
      <div className="contenido">
        <h1>Gestión de Productos</h1>
        <p>Aquí puedes agregar, editar y eliminar productos de la farmacia.</p>

        <div className="formulario">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Categoría"
            value={nuevoProducto.categoria}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio (Q)"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={nuevoProducto.stock}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
          />
          {editarProducto ? (
            <button className="btn-editar" onClick={guardarEdicion}>
              Guardar Edición
            </button>
          ) : (
            <button className="btn-agregar" onClick={agregarProducto}>
              Agregar Producto
            </button>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio (Q)</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>Q{producto.precio.toFixed(2)}</td>
                <td>{producto.stock}</td>
                <td>
                  <button className="btn-editar" onClick={() => editar(producto)}>✏️ Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>❌ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productos;
