import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./Context/AuthContext";
import { StatusBar } from "expo-status-bar";
import AppNav from "./AppNav";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNav />
        <StatusBar style="dark" />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
