import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext(null);

const storedUser = localStorage.getItem("qt_user");
const storedToken = localStorage.getItem("qt_token");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);

  async function login(credentials) {
    const data = await api.login(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("qt_user", JSON.stringify(data.user));
    localStorage.setItem("qt_token", data.token);
    return data;
  }

  async function register(payload) {
    const data = await api.register(payload);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("qt_user", JSON.stringify(data.user));
    localStorage.setItem("qt_token", data.token);
    return data;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("qt_user");
    localStorage.removeItem("qt_token");
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
