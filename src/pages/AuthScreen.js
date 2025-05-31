// src/pages/AuthScreen.js
import React, { useState } from 'react';
import FirebaseAuth from '../servicios/FirebaseAuth';
import { signOut } from 'firebase/auth'; 
import auth from '../servicios/firebaseConfig'; 

function AuthScreen({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    try {
      if (isLoginMode) {
        
        const user = await FirebaseAuth.login(email, password);
        setMensajeExito(`¡Bienvenido, ${user.email}!`);
        onAuthSuccess(user); 
      } else {
        
        const user = await FirebaseAuth.register(email, password);
        
      
        await signOut(auth); 
    

        setMensajeExito(`¡Usuario ${user.email} registrado exitosamente! Por favor, inicia sesión con tu nueva cuenta.`);
        setEmail('');       
        setPassword('');
        setIsLoginMode(true); 
        
        
        
        
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{isLoginMode ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {mensajeExito && <p style={{ color: 'green', textAlign: 'center' }}>{mensajeExito}</p>}

      <form onSubmit={handleSubmit} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
            style={{ width: 'calc(100% - 16px)', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isLoginMode ? "********" : "Min. 6 caracteres"}
            required
            style={{ width: 'calc(100% - 16px)', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <button 
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          {isLoginMode ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
        <button 
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setError(''); 
            setMensajeExito('');
          }}
          style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
        >
          {isLoginMode ? 'Regístrate aquí' : 'Iniciar Sesión'}
        </button>
      </p>
    </div>
  );
}

export default AuthScreen;