import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext(null);

const storedUser = localStorage.getItem("qt_user");
const storedToken = localStorage.getItem("qt_token");

function readRegisteredUsers() {
  const stored = localStorage.getItem("qt_registered_users");
  return stored ? JSON.parse(stored) : [];
}

function saveRegisteredUsers(users) {
  localStorage.setItem("qt_registered_users", JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);

  async function login(credentials) {
    const registeredUsers = readRegisteredUsers();
    const localUser = registeredUsers.find(
      (item) => item.email === credentials.email && item.password === credentials.password
    );

    if (localUser) {
      const safeUser = {
        id: localUser.id,
        name: localUser.name,
        email: localUser.email,
        role: "Demo Trader",
        plan: "Portfolio Demo",
        balance: localUser.balance || 15000,
        avatar: localUser.avatar || "",
        phone: localUser.phone || "",
        bankName: localUser.bankName || "",
        accountType: localUser.accountType || "",
        agency: localUser.agency || "",
        accountNumber: localUser.accountNumber || ""
      };

      setUser(safeUser);
      setToken("mock-token-local-registered-user");
      localStorage.setItem("qt_user", JSON.stringify(safeUser));
      localStorage.setItem("qt_token", "mock-token-local-registered-user");
      return { user: safeUser, token: "mock-token-local-registered-user" };
    }

    const data = await api.login(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("qt_user", JSON.stringify(data.user));
    localStorage.setItem("qt_token", data.token);
    return data;
  }

  async function register(payload) {
    const data = await api.register(payload);
    const registeredUsers = readRegisteredUsers();

    const createdUser = {
      id: data.user.id,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: "Demo Trader",
      plan: "Portfolio Demo",
      balance: 15000,
      avatar: "",
      phone: "",
      bankName: "",
      accountType: "",
      agency: "",
      accountNumber: ""
    };

    saveRegisteredUsers([
      ...registeredUsers.filter((item) => item.email !== payload.email),
      createdUser
    ]);

    return {
      message: "Your demo account has been created successfully.",
      user: createdUser
    };
  }

  function updateProfile(profile) {
    const updatedUser = {
      ...user,
      ...profile
    };

    setUser(updatedUser);
    localStorage.setItem("qt_user", JSON.stringify(updatedUser));

    const registeredUsers = readRegisteredUsers();
    const updatedRegisteredUsers = registeredUsers.map((item) =>
      item.email === user?.email
        ? {
            ...item,
            ...profile,
            email: profile.email || item.email
          }
        : item
    );

    saveRegisteredUsers(updatedRegisteredUsers);
    return updatedUser;
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
      updateProfile,
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
