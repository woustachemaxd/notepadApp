import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

const Homepage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const handleSubmit = () => {
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
        } else {
          setWrongCredentials(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [fontsLoaded] = useFonts({
    Megazoid: require("./assets/fonts/Megazoid.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.borderElem1}>
          <View style={styles.borderElem2}>
            <Text style={styles.header}>Welcome to Notepad</Text>
            {wrongCredentials && (
              <Text style={styles.subtitle}>Wrong Credentials</Text>
            )}
            <Text style={styles.subtitle}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(newValue) => {
                setUsername(newValue);
              }}
              placeholder="username"
            />
            <Text style={styles.subtitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="password"
              value={password}
              onChangeText={(newValue) => {
                setPassword(newValue);
              }}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttontext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
    height: "95.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  borderElem1: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    width: "97%",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
  },
  borderElem2: {
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "black",
    width: "99.5%",
    height: "99.7%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Megazoid",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 63,
    marginTop: 20,
    padding: 4,
  },
  input: {
    width: "70%",
    height: 40,
    borderRadius: 8,
    padding: 10,
    // backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "black",
  },
  button: {
    textAlign: "center",
    marginTop: 50,
    backgroundColor: "#070707",
    width: "22%",
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttontext: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
});

export default Homepage;
