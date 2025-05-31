import React, { useState } from 'react';

function Lotes() {
  const [lotes, setLotes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  // Agregar Lote
  const agregarLote = () => {
    if (nombre && cantidad && fechaVencimiento) {
      setLotes([...lotes, { nombre, cantidad, fechaVencimiento }]);
      setNombre('');
      setCantidad('');
      setFechaVencimiento('');
    } else {
      alert('Por favor, llena todos los campos.');
    }
  };

  return (
    <div>
      <h1>Gestión de Lotes</h1>
      <input type="text" placeholder="Nombre del medicamento" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
      <button onClick={agregarLote}>Agregar Lote</button>

      <table border="1">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Fecha de Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map((lote, index) => (
            <tr key={index}>
              <td>{lote.nombre}</td>
              <td>{lote.cantidad}</td>
              <td>{lote.fechaVencimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lotes;
