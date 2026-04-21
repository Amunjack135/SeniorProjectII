import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase";
import client from "../services/Client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  async function getAuth() {
    try {
      const res = await client.post("/react/connect",
        {},
        {headers: {"Content-Type": "application/json"}}
      );


      const json = await res.data;
      setAuth(json.auth);
    } catch (err) {
      console.error("Failed to fetch auth:", err);
      setAuth(null);
    } finally {
      setLoadingAuth(false);
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        currentUser,
        loadingAuth,
        loadingUser,
        isAuthenticated: Boolean(currentUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
