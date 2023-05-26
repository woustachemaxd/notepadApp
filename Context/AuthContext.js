import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getData = async (keyname) => {
    try {
      const jsonValue = await AsyncStorage.getItem(keyname);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("@user-details");
      if (data) {
        setUsername(data.username);
        setPassword(data.password);
        setLoggedIn(true);
      }
    };

    fetchData();
  }, []);

  const storeData = async (keyname, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(keyname, jsonValue);
    } catch (e) {}
  };
  removeValue = async (keyname) => {
    try {
      await AsyncStorage.removeItem(keyname);
    } catch (e) {
      // remove error
    }
    console.log("Done.");
  };

  const login = (username, password) => {
    console.log("Logging in...");
    const toSend = JSON.stringify({ username: username, password: password });
    fetch("https://testbackend-cql1.onrender.com/notepadlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: toSend,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          storeData("@user-details", {
            username: username,
            password: password,
          });
          setUsername(username);
          setPassword(password);
          setLoggedIn(true);
        } else {
          setWrongCredentials(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    removeValue("@user-details");
    setLoggedIn(false);
  };

  const setDetails = (username1, password1) => {
    setUsername(username1);
    setPassword(password1);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        wrongCredentials,
        login,
        logout,
        username,
        password,
        setDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
