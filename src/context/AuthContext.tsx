import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

