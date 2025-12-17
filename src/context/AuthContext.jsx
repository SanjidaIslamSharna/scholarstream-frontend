import { createContext, useState, useEffect } from "react";
import app from "../firebase.config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Auth persistence + DB role sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          localStorage.setItem("authToken", token);

          // Always get user from DB (role, photo, etc)
          const res = await axiosInstance.post("/users", {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });

          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
        } else {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Auth sync error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Google Login
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL, uid } = result.user;

    const res = await axiosInstance.post("/users", {
      uid,
      name: displayName,
      email,
      photoURL,
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("authToken", await result.user.getIdToken());
    setUser(res.data);
  };

  // 📝 Email Register (PhotoURL FIXED)
  const registerWithEmail = async (name, email, photoURL, password) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update Firebase profile
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL,
    });

    const uid = result.user.uid;

    const res = await axiosInstance.post("/users", {
      uid,
      name,
      email,
      photoURL,
      role: "Student",
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("authToken", await result.user.getIdToken());
    setUser(res.data);
  };

  // 🔑 Email Login
  const loginWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const res = await axiosInstance.post("/users", {
      uid: result.user.uid,
      email,
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("authToken", await result.user.getIdToken());
    setUser(res.data);
  };

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
