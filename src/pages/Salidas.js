import React, { useState, useEffect } from 'react';

function Salidas() {
  // Lista de 60 productos iniciales con stock simulado (puedes ajustar las cantidades)
  const [stock, setStock] = useState({
    'Paracetamol 500mg': 120, 'Ibuprofeno 400mg': 80, 'Amoxicilina 500mg': 95,
    'Omeprazol 20mg': 110, 'Loratadina 10mg': 150, 'Metformina 850mg': 70,
    'Atorvastatina 20mg': 60, 'Losartán 50mg': 100, 'Clonazepam 2mg': 45,
    'Sertralina 50mg': 55, 'Salbutamol 100mcg': 130, 'Prednisona 5mg': 90,
    'Diclofenaco 50mg': 115, 'Ranitidina 150mg': 85, 'Warfarina 5mg': 30,
    'Levotiroxina 100mcg': 70, 'Furosemida 40mg': 65, 'Gabapentina 300mg': 75,
    'Aspirina 100mg': 200, 'Ciprofloxacino 500mg': 88, 'Azitromicina 500mg': 72,
    'Dexametasona 4mg': 98, 'Tramadol 50mg': 40, 'Codeína 30mg': 35,
    'Morfina 10mg': 20, 'Fentanyl 50mcg': 15, 'Insulina Lispro 100U/ml': 50,
    'Insulina Glargina 100U/ml': 48, 'Cefalexina 500mg': 92, 'Doxiciclina 100mg': 78,
    'Fluconazol 150mg': 62, 'Metronidazol 500mg': 83, 'Amlodipino 5mg': 105,
    'Valsartán 80mg': 89, 'Simvastatina 20mg': 77, 'Rosuvastatina 10mg': 68,
    'Escitalopram 10mg': 52, 'Alprazolam 0.5mg': 42, 'Diazepam 5mg': 38,
    'Risperidona 2mg': 28, 'Quetiapina 100mg': 33, 'Olanzapina 5mg': 25,
    'Litio 300mg': 18, 'Lamotrigina 100mg': 31, 'Topiramato 50mg': 29,
    'Aciclovir 200mg': 94, 'Valaciclovir 500mg': 67, 'Oseltamivir 75mg': 58,
    'Zanamivir 10mg': 53, 'Hidroclorotiazida 25mg': 112, 'Espironolactona 25mg': 79,
    'Lactulosa 667mg/ml': 108, 'Bismuto Subsalicilato': 140, 'Loperamida 2mg': 160,
    'Dimenhidrinato 50mg': 125, 'Ondansetrón 4mg': 69, 'Metoclopramida 10mg': 96,
    'Pantoprazol 40mg': 103, 'Esomeprazol 40mg': 91
  });

  // Lista de 60 motivos de salida
  const motivosSalida = [
    'Venta al Detalle', 'Venta con Receta Médica', 'Venta sin Receta',
    'Venta Online', 'Venta por Catálogo', 'Venta Urgente',
    'Merma por Caducidad', 'Merma por Daño Físico', 'Merma por Contaminación',
    'Merma por Rotura', 'Merma por Manipulación', 'Merma por Hurto',
    'Donación a Hospital Público', 'Donación a ONG Local', 'Donación a Campaña de Salud',
    'Donación a Desastre Natural', 'Donación a Centro Comunitario', 'Uso Interno para Pruebas',
    'Uso Interno para Demostraciones', 'Uso Interno de Laboratorio', 'Muestra Médica para Profesionales',
    'Material para Capacitación', 'Descarte por Control de Calidad', 'Devolución a Proveedor (Defectuoso)',
    'Devolución a Proveedor (Exceso)', 'Devolución de Cliente (Producto Erróneo)', 'Transferencia a Sucursal A',
    'Transferencia a Sucursal B', 'Transferencia a Almacén Central', 'Ajuste por Inventario Físico (Negativo)',
    'Ajuste por Error de Registro', 'Retiro del Mercado por Alerta Sanitaria', 'Destrucción Regulada',
    'Producto Obsoleto', 'Vencimiento Próximo (para baja)', 'Reempaque (materia prima)',
    'Uso en Investigación Clínica', 'Descarte de Lote Fallido', 'Venta a Mayorista',
    'Venta a Clínicas Privadas', 'Venta a Farmacias Afiliadas', 'Merma por Temperatura',
    'Merma por Mal Almacenamiento', 'Donación a Asilo de Ancianos', 'Uso Interno para Empleados',
    'Devolución por Garantía', 'Transferencia Inter-Bodega', 'Ajuste por Pérdida Desconocida',
    'Baja por Mantenimiento', 'Consumo en Consultorio', 'Venta Ambulatoria',
    'Venta por Prescripción Especial', 'Merma por Reclamación', 'Donación a Centro de Recreación',
    'Uso en Campaña de Vacunación', 'Devolución por Transporte', 'Transferencia a Centro de Distribución',
    'Ajuste por Recepción Incorrecta', 'Eliminación por Desecho Biopeligroso', 'Baja por Liquidación'
  ];

  const [salidas, setSalidas] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  const [registroAuditoria, setRegistroAuditoria] = useState([]);
  const [mensajeAlerta, setMensajeAlerta] = useState(''); // Para mostrar mensajes al usuario

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const getFechaActual = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Meses de 0-11
    let dd = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    return `${yyyy}-${mm}-${dd}`;
  };

  // Establece la fecha actual por defecto al cargar el componente
  useEffect(() => {
    setFecha(getFechaActual());
  }, []);

  const handleProductoChange = (event) => {
    setProductoSeleccionado(event.target.value);
    setMensajeAlerta(''); // Limpia el mensaje al cambiar el producto
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
    setMensajeAlerta('');
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
    setMensajeAlerta('');
  };

  const handleMotivoChange = (event) => {
    setMotivo(event.target.value);
    setMensajeAlerta('');
  };

  const registrarSalida = () => {
    // Validaciones
    if (!productoSeleccionado) {
      setMensajeAlerta('Por favor, selecciona un producto.');
      return;
    }
    if (!cantidad) {
      setMensajeAlerta('Por favor, ingresa la cantidad.');
      return;
    }
    const cantidadInt = parseInt(cantidad, 10);
    if (isNaN(cantidadInt) || cantidadInt <= 0) {
      setMensajeAlerta('La cantidad debe ser un número positivo.');
      return;
    }
    if (!fecha) {
      setMensajeAlerta('Por favor, ingresa la fecha.');
      return;
    }
    if (!motivo) {
      setMensajeAlerta('Por favor, selecciona un motivo.');
      return;
    }

    // Verificar stock disponible
    if (!stock[productoSeleccionado] || stock[productoSeleccionado] < cantidadInt) {
      setMensajeAlerta(`No hay suficiente stock de ${productoSeleccionado}. Stock actual: ${stock[productoSeleccionado] || 0}`);
      return;
    }

    // Descontar del stock
    setStock(prevStock => ({
      ...prevStock,
      [productoSeleccionado]: prevStock[productoSeleccionado] - cantidadInt,
    }));

    // Crear registro de salida
    const nuevaSalida = {
      producto: productoSeleccionado,
      cantidad: cantidadInt,
      fecha,
      motivo,
    };
    setSalidas([...salidas, nuevaSalida]);

    // Crear registro para auditoría
    setRegistroAuditoria([
      ...registroAuditoria,
      {
        producto: productoSeleccionado,
        cantidad: cantidadInt,
        fecha,
        motivo,
        timestamp: new Date().toLocaleString(), // Marca de tiempo para auditoría
      },
    ]);

    // Limpiar campos del formulario
    setProductoSeleccionado('');
    setCantidad('');
    // No limpiamos la fecha, ya que se establece a la actual por defecto
    setMotivo('');
    setMensajeAlerta('Salida registrada exitosamente.'); // Mensaje de éxito
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Registro de Salidas de Productos Farmacéuticos</h1>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#555' }}>Registrar Nueva Salida</h2>
        {mensajeAlerta && (
          <p style={{ color: mensajeAlerta.includes('exitosa') ? 'green' : 'red', fontWeight: 'bold' }}>
            {mensajeAlerta}
          </p>
        )}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="producto" style={{ display: 'block', marginBottom: '5px' }}>Producto:</label>
          <select
            id="producto"
            value={productoSeleccionado}
            onChange={handleProductoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">-- Seleccionar producto --</option>
            {Object.keys(stock).sort().map((producto) => ( // Ordenar productos alfabéticamente
              <option key={producto} value={producto}>
                {producto} (Stock: {stock[producto]})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="cantidad" style={{ display: 'block', marginBottom: '5px' }}>Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Cantidad a descontar"
            value={cantidad}
            onChange={handleCantidadChange}
            min="1"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="fecha" style={{ display: 'block', marginBottom: '5px' }}>Fecha de Salida:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={handleFechaChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="motivo" style={{ display: 'block', marginBottom: '5px' }}>Motivo de Salida:</label>
          <select
            id="motivo"
            value={motivo}
            onChange={handleMotivoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">-- Seleccionar motivo --</option>
            {motivosSalida.sort().map((motivoItem) => ( // Ordenar motivos alfabéticamente
              <option key={motivoItem} value={motivoItem}>
                {motivoItem}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={registrarSalida}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          Registrar Salida
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#555' }}>Stock Actual de Productos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Producto</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Cantidad en Stock</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stock).sort().map(([nombreProducto, cantidadStock]) => ( // Ordenar por nombre de producto
              <tr key={nombreProducto}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{nombreProducto}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cantidadStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#555' }}>Historial de Salidas Registradas</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Producto</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Cantidad</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Fecha</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {salidas.map((salida, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{salida.producto}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{salida.cantidad}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{salida.fecha}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{salida.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 style={{ color: '#555' }}>Registro de Auditoría Detallado</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Producto</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Cantidad</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Fecha</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Motivo</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {registroAuditoria.map((registro, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{registro.producto}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{registro.cantidad}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{registro.fecha}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{registro.motivo}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{registro.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Salidas;