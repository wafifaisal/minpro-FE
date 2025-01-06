"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { IUser } from "@/types/profile";

interface SessionContextProps {
  isAuth: boolean;
  user: IUser | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: IUser | null) => void;
  userId: string | null;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [userId] = useState<string | null>(null);

  const checkSession =useCallback( async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Login First");
        return;
      }

      const res = await fetch(`${base_url}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw result;
      setUser(result.result);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
      setIsAuth(false);
      setUser(null);
    }
  },[userId]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <SessionContext.Provider
      value={{ isAuth, user, setIsAuth, setUser, userId }}
    >
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
