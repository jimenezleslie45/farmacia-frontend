import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './servicios/firebaseConfig';

import Inicio from './pages/Inicio';
import Inventario from './pages/Inventario';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import Medicinas from './pages/Medicinas';
import Lotes from './pages/Lotes';
import Entradas from './pages/Entradas';
import Salidas from './pages/Salidas';
import Facturacion from './pages/Facturacion';
import Carrito from './pages/Carrito';
import Login from './pages/Login';

function Dashboard() {
  const handleLogout = async () => {
    try {
      await auth.signOut(auth); 
      alert("Sesión cerrada exitosamente.");
    } catch (error) {
      alert("Error al cerrar sesión: " + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>¡Bienvenido a tu Dashboard!</h1>
      <p>Aquí verás el contenido principal de tu aplicación de farmacia.</p>
      <button 
        onClick={handleLogout}
        className="logout-button"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  if (cargando) return <h3 className="loading-message">Cargando...</h3>;

  return (
    <Routes>
      <Route
        path="/login"
        element={!usuario ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={usuario ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/inventario"
        element={usuario ? <Inventario /> : <Navigate to="/login" />}
      />
      <Route
        path="/productos"
        element={usuario ? <Productos /> : <Navigate to="/login" />}
      />
      <Route
        path="/ventas"
        element={usuario ? <Ventas /> : <Navigate to="/login" />}
      />
      <Route
        path="/medicinas"
        element={usuario ? <Medicinas /> : <Navigate to="/login" />}
      />
      <Route
        path="/lotes"
        element={usuario ? <Lotes /> : <Navigate to="/login" />}
      />
      <Route
        path="/entradas"
        element={usuario ? <Entradas /> : <Navigate to="/login" />}
      />
      <Route
        path="/salidas"
        element={usuario ? <Salidas /> : <Navigate to="/login" />}
      />
      <Route
        path="/facturacion"
        element={usuario ? <Facturacion /> : <Navigate to="/login" />}
      />
      <Route
        path="/carrito"
        element={usuario ? <Carrito /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;