"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IEvent } from "@/types/event";

interface SessionContextProps {
  isAuth: boolean;
  user: IEvent | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: IEvent | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IEvent | null>(null);

  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/events", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setUser(result.event);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
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
