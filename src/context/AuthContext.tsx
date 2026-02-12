import React, { createContext, useContext, useState } from "react";

type Role = "student" | "teacher" | "hr" | "driver" | "librarian";

type AuthContextType = {
  userRole: Role | null;
  login: (role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<Role | null>(null);

  const login = (role: Role) => setUserRole(role);
  const logout = () => setUserRole(null);

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
