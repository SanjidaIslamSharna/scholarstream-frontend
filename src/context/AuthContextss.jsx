import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import {
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL; // backend base url

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- AUTH STATE LISTENER ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await saveUserToDB(currentUser); // ensure user exists in DB
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /* ---------------- SAVE USER TO DATABASE ---------------- */
  const saveUserToDB = async (firebaseUser) => {
    const userData = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || "",
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL || "",
      role: "Student", // 🔒 force default role
    };

    try {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    } catch (err) {
      console.error("User save failed:", err);
    }
  };

  /* ---------------- SIGN UP ---------------- */
  const signup = async (name, photoURL, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
      photoURL,
    });

    await saveUserToDB({
      ...result.user,
      displayName: name,
      photoURL,
    });

    setUser({ ...result.user });
    return result;
  };

  /* ---------------- LOGIN ---------------- */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await saveUserToDB(result.user);
    setUser(result.user);

    return result;
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
