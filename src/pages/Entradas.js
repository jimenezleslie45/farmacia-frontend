import React, { useState } from 'react';

function Entradas() {
  const [entradas, setEntradas] = useState([]);
  const [stock, setStock] = useState({}); // Estado para el stock: { nombreProducto: cantidad }
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [precioCompra, setPrecioCompra] = useState(''); // Nuevo campo para el precio de compra
  const [registroDB, setRegistroDB] = useState([]); // Simulación de registro en la base de datos

  const agregarEntrada = () => {
    if (producto && cantidad && fecha && precioCompra) {
      const cantidadInt = parseInt(cantidad, 10);
      const precioCompraFloat = parseFloat(precioCompra);

      // Actualizar el stock
      setStock(prevStock => ({
        ...prevStock,
        [producto]: (prevStock[producto] || 0) + cantidadInt,
      }));

      const nuevaEntrada = { producto, cantidad: cantidadInt, fecha, precioCompra: precioCompraFloat };
      setEntradas([...entradas, nuevaEntrada]);

      // Simular registro en la base de datos
      setRegistroDB([...registroDB, { ...nuevaEntrada, tipo: 'entrada', timestamp: new Date().toLocaleString() }]);

      setProducto('');
      setCantidad('');
      setFecha('');
      setPrecioCompra('');
    } else {
      alert('Llena todos los campos');
    }
  };

  return (
    <div>
      <h1>Registro de Entradas</h1>
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
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio de Compra"
        value={precioCompra}
        onChange={(e) => setPrecioCompra(e.target.value)}
        step="0.01"
      />
      <button onClick={agregarEntrada}>Agregar Entrada</button>

      <h2>Entradas Registradas</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Precio de Compra</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map((entrada, index) => (
            <tr key={index}>
              <td>{entrada.producto}</td>
              <td>{entrada.cantidad}</td>
              <td>{entrada.fecha}</td>
              <td>Q{entrada.precioCompra.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Stock Actual</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad en Stock</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stock).map(([nombreProducto, cantidadStock]) => (
            <tr key={nombreProducto}>
              <td>{nombreProducto}</td>
              <td>{cantidadStock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Registro en Base de Datos </h2>
      <table border="1">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Precio de Compra</th>
            <th>Tipo</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {registroDB.map((registro, index) => (
            <tr key={index}>
              <td>{registro.producto}</td>
              <td>{registro.cantidad}</td>
              <td>{registro.fecha}</td>
              <td>Q{registro.precioCompra ? registro.precioCompra.toFixed(2) : ''}</td>
              <td>{registro.tipo}</td>
              <td>{registro.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Entradas;