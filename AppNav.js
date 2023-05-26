import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { AsyncStorage } from "react-native"; // Import AsyncStorage

import Notepad from "./src/Notepad";
import Homepage from "./src/Homepage";

const Stack = createStackNavigator();

const AppNav = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {loggedIn ? (
        <Stack.Screen name="Notepad" component={Notepad} />
      ) : (
        <Stack.Screen name="Home" component={Homepage} />
      )}
    </Stack.Navigator>
  );
};

export default AppNav;
