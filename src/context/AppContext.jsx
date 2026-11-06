import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Enable sending cookies (JWT) with every cross-origin request
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check user authentication status on initial app load
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/me`);
      if (data.success && data.user) {
        setIsLoggedIn(true);
        setUserData(data.user);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      // 401 means not authenticated yet
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all todos for the logged-in user
  const getTodos = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/todos`);
      if (data.success) {
        setTodos(data.todos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Verify auth on mount
  useEffect(() => {
    getUserData();
  }, []);

  // When logged in, automatically fetch todos
  useEffect(() => {
    if (isLoggedIn) {
      getTodos();
    } else {
      setTodos([]);
    }
  }, [isLoggedIn]);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    todos,
    setTodos,
    loading,
    getUserData,
    getTodos,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

