import { useState } from 'react';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  function login(nombreUsuario) {
    setUsuario(nombreUsuario);
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}