import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [inactiveInfo, setInactiveInfo] =
    useState(null);

  useEffect(() => {
    const loadUser =
      async () => {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        try {
          const data =
            await getCurrentUser(
              token
            );

          setUser(data.user);
        } catch (error) {
          console.error(error);

          if (
            error.response?.data?.inactive
          ) {
            setInactiveInfo({
              message:
                error.response.data.message,
              adminEmail:
                error.response.data.adminEmail,
            });

            return;
          }

          localStorage.removeItem(
            "token"
          );

          setUser(null);
        }
      };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        inactiveInfo,
        setInactiveInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}