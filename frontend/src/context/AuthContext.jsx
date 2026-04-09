import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('godToken'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('godUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('godToken', nextToken);
    localStorage.setItem('godUser', JSON.stringify(nextUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('godToken');
    localStorage.removeItem('godUser');
  };

  const value = useMemo(() => ({ token, user, login, logout, setUser }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
