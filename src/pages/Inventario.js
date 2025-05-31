// Inventario.js
import React, { useState } from "react";
import Plot from "react-plotly.js";
import Sidebar from "../Componentes/Sidebar";
import "./Inventario.css";

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", stock: "", precio: "" });
  const [totalVendido, setTotalVendido] = useState(0);
  const [mostrarTotal, setMostrarTotal] = useState(false);

  const agregarProducto = () => {
    if (nuevoProducto.nombre && nuevoProducto.stock && nuevoProducto.precio) {
      setProductos([
        ...productos,
        {
          id: productos.length + 1,
          nombre: nuevoProducto.nombre,
          stock: parseInt(nuevoProducto.stock),
          precio: parseFloat(nuevoProducto.precio),
        },
      ]);
      setNuevoProducto({ nombre: "", stock: "", precio: "" });
    }
  };

  const eliminarProducto = (id) => {
    const productoEliminado = productos.find((p) => p.id === id);
    if (productoEliminado) {
      setTotalVendido(totalVendido + productoEliminado.precio * productoEliminado.stock);
      setProductos(productos.filter((producto) => producto.id !== id));
    }
  };

  const actualizarInventario = () => {
    setProductos([]);
    setTotalVendido(0);
    setMostrarTotal(false);
  };

  return (
    <div className="contenedor">
      <Sidebar />
      <div className="contenido">
        <h1>Inventario</h1>
        <p>Gestione el inventario de la farmacia y manténgalo actualizado.</p>

        <div className="formulario">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad en stock"
            value={nuevoProducto.stock}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio (Q)"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
          />
          <button onClick={agregarProducto}>Agregar Producto</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
              <th>Precio (Q)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.stock}</td>
                <td>Q{producto.precio}</td>
                <td>
                  <button className="eliminar" onClick={() => eliminarProducto(producto.id)}>
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="botones-inventario">
          <button onClick={() => setMostrarTotal(true)}>Mostrar Total Vendido</button>
          <button onClick={actualizarInventario}>Actualizar</button>
        </div>

        {mostrarTotal && (
          <div className="total-vendido">
            <p><strong>Total vendido hoy:</strong> Q{totalVendido.toFixed(2)}</p>
          </div>
        )}

        <div className="grafico3d">
          <h3>📊 Gráfico 3D del Stock de Productos</h3>
          <Plot
            data={[
              {
                type: "surface",
                z: [productos.map((p) => p.stock)],
                x: productos.map((_, i) => i),
                y: productos.map((p) => p.nombre),
                colorscale: "Rainbow",
              },
            ]}
            layout={{
              width: 800,
              height: 500,
              title: "Gráfico 3D del Stock",
              scene: {
                xaxis: { title: "# Producto" },
                yaxis: { title: "Nombre" },
                zaxis: { title: "Stock" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Inventario;
