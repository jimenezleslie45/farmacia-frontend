import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../servicios/firebaseConfig";
import FirebaseAuth from "../servicios/FirebaseAuth";
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    if (!email || !password) {
      setError("Por favor, ingrese su correo y contraseña.");
      return;
    }

    try {
      if (isLoginMode) {
        await FirebaseAuth.login(email, password);
        setMensajeExito(" Inicio de sesión exitoso");
        
      } else {
        const user = await FirebaseAuth.register(email, password);
        await signOut(auth); 
        setMensajeExito(`✅ Usuario ${user.email} registrado exitosamente. Por favor, inicia sesión con tu nueva cuenta.`);
        setEmail("");
        setPassword("");
        setIsLoginMode(true);
      }
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido a Farmacia</h2>
        <p className="subtitulo">
          {isLoginMode ? "Inicia sesión" : "Regístrate"}
        </p>
        
        {error && <p className="error-message">{error}</p>}
        {mensajeExito && <p className="success-message">{mensajeExito}</p>}

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLoginMode ? "Ingresar" : "Registrarse"}</button>
        </form>

        <p className="toggle-mode">
          {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <span 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError('');
              setMensajeExito('');
            }} 
            className="toggle-button" 
          >
            {isLoginMode ? "Regístrate aquí" : "Iniciar Sesión"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;