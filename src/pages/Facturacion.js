import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Facturacion.css";

function Facturacion() {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [facturasGeneradas, setFacturasGeneradas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");

  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    lugar: "",
    fecha: "",
    telefono: "",
    nit: "",
  });

  const calcularTotal = () =>
    productos.reduce((total, item) => total + item.cantidad * item.precio, 0).toFixed(2);

  const agregarProducto = () => {
    if (producto.trim() !== "" && cantidad > 0 && precio > 0) {
      setProductos([
        ...productos,
        {
          producto,
          cantidad: parseInt(cantidad),
          precio: parseFloat(precio),
        },
      ]);
      setProducto("");
      setCantidad("");
      setPrecio("");
    } else {
      alert("Por favor llena todos los campos del producto.");
    }
  };

  const generarPDF = () => {
    if (!cliente.nombre || productos.length === 0) {
      alert("Por favor llena los datos del cliente y agrega productos.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(34, 102, 102);
    doc.text("Factura Electrónica - Farmacia", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Nombre: ${cliente.nombre}`, 20, 35);
    doc.text(`Dirección: ${cliente.direccion}`, 20, 42);
    doc.text(`Lugar: ${cliente.lugar}`, 20, 49);
    doc.text(`Fecha: ${cliente.fecha}`, 20, 56);
    doc.text(`Teléfono: ${cliente.telefono}`, 20, 63);
    doc.text(`NIT: ${cliente.nit}`, 20, 70);

    const tabla = productos.map((item) => [
      item.producto,
      item.cantidad,
      `Q${item.precio.toFixed(2)}`,
    ]);
    tabla.push(["Total", "", `Q${calcularTotal()}`]);

    autoTable(doc, {
      startY: 80,
      head: [["Producto", "Cantidad", "Precio"]],
      body: tabla,
      theme: "grid",
      styles: { fillColor: [101, 165, 255] },
    });

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const nombreArchivo = `Factura_${cliente.nombre}_${cliente.fecha}.pdf`;

    setFacturasGeneradas([
      ...facturasGeneradas,
      {
        cliente: { ...cliente },
        total: calcularTotal(),
        fecha: cliente.fecha,
        productos: [...productos],
        url,
        nombreArchivo,
      },
    ]);

    // Reiniciar los productos para la siguiente factura
    setProductos([]);
    // Opcional: Puedes reiniciar también los datos del cliente si lo deseas
    // setCliente({ nombre: "", direccion: "", lugar: "", fecha: "", telefono: "", nit: "" });
  };

  const descargarFactura = (factura) => {
    const link = document.createElement('a');
    link.href = factura.url;
    link.download = factura.nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(factura.url);
  };

  const facturasFiltradas = filtroFecha
    ? facturasGeneradas.filter((factura) => factura.fecha === filtroFecha)
    : facturasGeneradas;

  return (
    <div className="factura-container">
      <h1>Facturación</h1>

      <div className="cliente-form">
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={cliente.nombre}
          onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={cliente.direccion}
          onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lugar"
          value={cliente.lugar}
          onChange={(e) => setCliente({ ...cliente, lugar: e.target.value })}
        />
        <input
          type="date"
          value={cliente.fecha}
          onChange={(e) => setCliente({ ...cliente, fecha: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={cliente.telefono}
          onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
        />
        <input
          type="text"
          placeholder="NIT"
          value={cliente.nit}
          onChange={(e) => setCliente({ ...cliente, nit: e.target.value })}
        />
      </div>

      <div className="producto-form">
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
          min="1"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="0.01"
          step="0.01"
        />
        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>

      <table className="factura-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item, index) => (
            <tr key={index}>
              <td>{item.producto}</td>
              <td>{item.cantidad}</td>
              <td>Q{item.precio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total</td>
            <td>Q{calcularTotal()}</td>
          </tr>
        </tfoot>
      </table>

      <button className="btn-descargar" onClick={generarPDF}>
        Generar y Guardar Factura
      </button>

      <h2>Historial de Facturas</h2>
      <div className="filtro-facturas">
        <label htmlFor="filtroFecha">Filtrar por fecha: </label>
        <input
          type="date"
          id="filtroFecha"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
        <button onClick={() => setFiltroFecha("")}>Limpiar Filtro</button>
      </div>

      {facturasFiltradas.length === 0 && facturasGeneradas.length > 0 ? (
        <p>No hay facturas para la fecha seleccionada.</p>
      ) : (
        <ul className="lista-facturas">
          {facturasFiltradas.map((factura, index) => (
            <li key={index}>
              <strong>Cliente:</strong> {factura.cliente.nombre},
              <strong>Fecha:</strong> {factura.fecha},
              <strong>Total:</strong> Q{factura.total}
              <button onClick={() => descargarFactura(factura)}>Descargar</button>
            </li>
          ))}
        </ul>
      )}
      {facturasGeneradas.length === 0 && (
        <p>Aún no se han generado facturas.</p>
      )}
    </div>
  );
}

export default Facturacion;