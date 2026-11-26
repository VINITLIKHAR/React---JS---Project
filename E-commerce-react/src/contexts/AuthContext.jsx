import { createContext, useContext, useState } from "react";

// DEMO ONLY: users live in localStorage. Passwords are NOT safe here. Replace with a real API later.
const USERS_KEY = "shopzy_users";
const SESSION_KEY = "shopzy_session";

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => read(SESSION_KEY, null));

  // Save (or remove) the logged-in user
  const startSession = (u) => {
    setUser(u);
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };

  const register = ({ name, email, password }) => {
    const users = read(USERS_KEY, []);
    if (users.some((u) => u.email === email)) throw new Error("This email is already registered");
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, { name, email, password, phone: "", address: "" }]));
    startSession({ name, email, phone: "", address: "" });
  };

  const login = ({ email, password }) => {
    const found = read(USERS_KEY, []).find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    startSession({ name: found.name, email: found.email, phone: found.phone, address: found.address });
  };

  const logout = () => startSession(null);

  const updateProfile = (changes) => {
    const users = read(USERS_KEY, []).map((u) => (u.email === user.email ? { ...u, ...changes } : u));
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    startSession({ ...user, ...changes });
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);