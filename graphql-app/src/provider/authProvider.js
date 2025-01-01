// Store and share authentication-related data and functions throughout our application

import axios from "axios";
// axios automatically attaches the Authorization header for REST API Requests

import { createContext, useContext, useEffect, useMemo, useState } from "react";

// auth context used to share auth state and funcs between components
const AuthContext = createContext(null);

// auth provider serves as provider for the auth context
// receives children as prop (child components that have access to the auth context)
const AuthProvider = ({ children }) => {
  // component content

  const [token, setToken_] = useState(localStorage.getItem("token"));

  // setToken func updates the authentication token
  // used to set new token value
  const setToken = (newToken) => {
    setToken_(newToken); // updates token state and stores token value in local storage
  };

  const logout = () => {
    setToken_(null); // clearing token
  };

  // using useEffect, we set default auth header in axios, storing token in local store
  // effect triggers whenever token value changes
  // if token exists, set auth header in axios and local store
  // if null/undefined, remove auth header from axiso and local store

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token); // Token persists in local storage, ensuring user stays logged in even after refreshing
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token", token);
    }
  }, [token]);

  // creating a memoized context value (including token/setToken func)
  // only recomputed when token changes
  const contextValue = useMemo(
    () => ({
      token, // current auth token (JWT)
      setToken, // func to update the token
      logout, // cleared token
    }),
    [token]
  );

  // Wrapping children components with the AuthContext.Provider
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// useAuth is a custom hook which components can call to access token and setToken without manually importing useContext(AuthContext) in every file
export const useAuth = () => {
  // useContxt - react hook allowing components to consume values from a Context provider
  return useContext(AuthContext);
  // accesses AuthContext retrieving current contextValue -> { token, setToken }
};

export default AuthProvider; // wrap app or specific parts where auth data needed
