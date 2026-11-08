
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Header() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="header">
      <h2>Gym App</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/actividades">Actividades</Link>

        {usuario && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;

