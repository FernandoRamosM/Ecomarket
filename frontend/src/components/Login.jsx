import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [recoveredPassword, setRecoveredPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      if (response.data.success) {
        window.location.href = '/home';
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/recover', { username, dni });
      if (response.data.password) {
        setRecoveredPassword(response.data.password);
      } else {
        alert('Usuario o DNI incorrecto');
      }
    } catch (error) {
      console.error('Error al recuperar contraseña:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div className="login-links">
        <a href="#forgot-password" onClick={() => setShowRecoverModal(true)}>Olvidé mi contraseña</a>
        <a href="/register">Registro</a>
      </div>
      {showRecoverModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRecoverModal(false)}>×</span>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleRecoverPassword}>
              <div className="form-group">
                <label htmlFor="recover-username">Usuario</label>
                <input
                  type="text"
                  id="recover-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="recover-dni">DNI</label>
                <input
                  type="text"
                  id="recover-dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Recuperar Contraseña</button>
            </form>
            {recoveredPassword && (
              <p>Tu contraseña es: {recoveredPassword}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;