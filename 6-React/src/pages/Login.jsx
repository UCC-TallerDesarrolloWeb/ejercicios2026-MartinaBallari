
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import '../styles/Login.scss';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (usuario === 'admin' && password === 'admin') {
      login(usuario);
      console.log('Login OK');
      navigate('/actividades');
    } else {
      console.log('Login Incorrecto');
      setError('Usuario o contraseña incorrectos');
    }
  }

  return (
    <section className="login">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <label>Usuario</label>

        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Ingresá tu usuario"
        />

        <label>Contraseña</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresá tu contraseña"
        />

        <button type="submit">Ingresar</button>

        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

export default Login;
