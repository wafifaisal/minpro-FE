"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface SessionContextProps {
  isAuth: boolean;
  user: User | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: User | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const checkSession = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const result = await res.json();
      setUser({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      });
      setIsAuth(true);
    } catch (err) {
      console.error("Error checking session:", err);
      setUser(null);
      setIsAuth(false);
      localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ isAuth, user, setIsAuth, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
