import React, { useState } from 'react';

function Medicinas() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');

  // Agregar medicamento
  const agregarMedicamento = () => {
    if (nombre && categoria && stock && precio) {
      setMedicamentos([...medicamentos, { nombre, categoria, stock, precio }]);
      setNombre('');
      setCategoria('');
      setStock('');
      setPrecio('');
    } else {
      alert('Llena todos los campos');
    }
  };

  return (
    <div>
      <h1>Gestión de Medicinas</h1>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      <button onClick={agregarMedicamento}>Agregar Medicina</button>

      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med, index) => (
            <tr key={index}>
              <td>{med.nombre}</td>
              <td>{med.categoria}</td>
              <td>{med.stock}</td>
              <td>Q{med.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Medicinas;
