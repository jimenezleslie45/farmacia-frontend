// src/pages/Ventas.js
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Ventas.css';

function Ventas() {
  const [inventario, setInventario] = useState([]);
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar inventario real desde la API
  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(res => res.json())
      .then(data => setInventario(data))
      .catch(err => console.error('Error al cargar productos desde la base de datos:', err));
  }, []);

  const agregarProducto = () => {
    const prod = inventario.find(p => p.nombre.toLowerCase() === producto.toLowerCase());
    if (!prod) return alert('Producto no encontrado en inventario');
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) return alert('Cantidad inválida');
    if (prod.stock < cantidad) return alert('No hay suficiente stock');

    const nuevoProducto = {
      producto: prod.nombre,
      cantidad: parseInt(cantidad),
      precio: prod.precio,
      subtotal: parseInt(cantidad) * prod.precio
    };

    // Descontar del inventario local
    setInventario(prev =>
      prev.map(p =>
        p.nombre.toLowerCase() === producto.toLowerCase()
          ? { ...p, stock: p.stock - nuevoProducto.cantidad }
          : p
      )
    );

    setProductosVendidos([...productosVendidos, nuevoProducto]);
    setTotal(prev => prev + nuevoProducto.subtotal);
    setProducto('');
    setCantidad('');
  };

  const generarFactura = () => {
    if (productosVendidos.length === 0) return alert('No hay productos para facturar');

    const doc = new jsPDF();
    doc.text('Factura de Venta', 20, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Producto', 'Cantidad', 'Precio', 'Subtotal']],
      body: productosVendidos.map(p => [p.producto, p.cantidad, `Q${p.precio}`, `Q${p.subtotal}`]),
    });

    doc.text(`Total: Q${total.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);
    doc.save('factura_venta.pdf');
  };

  return (
    <div className="ventas">
      <h1>Registro de Ventas</h1>

      <input
        type="text"
        placeholder="Producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <button onClick={agregarProducto}>Agregar al Carrito</button>

      <table border="1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {productosVendidos.map((prod, index) => (
            <tr key={index}>
              <td>{prod.producto}</td>
              <td>{prod.cantidad}</td>
              <td>Q{prod.precio.toFixed(2)}</td>
              <td>Q{prod.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total: Q{total.toFixed(2)}</h2>
      <button onClick={generarFactura}>Generar Factura PDF</button>
    </div>
  );
}

export default Ventas;
