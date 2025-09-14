import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userid,setUserid]=useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Restore from localStorage on refresh
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    setUserid(localStorage.getItem("id"));
    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("❌ Failed to parse stored user:", error);
      localStorage.removeItem("user"); // clear corrupted data
    }

    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    }
  }, []);

  const login = (userData, tokenValue) => {
    console.log("🔑 login called with:", userData);

    // Save user (including id) in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    if (tokenValue) localStorage.setItem("token", tokenValue);
    setUser(userData);
    setToken(tokenValue || null);
  };


  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
