import { createContext, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-folder/firebase-config";
const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const values = { userInfo, setUserInfo };
  useState(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  });
  return (
    <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be within the AuthProvider method");
  return context;
}

export { AuthProvider, useAuth };
