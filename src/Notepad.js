import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../Context/AuthContext";

const Notepad = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [notepad, setNotepad] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(() => {
      getNotePadData();
      return false;
    });
  }, []);
  const { logout, username, password } = useContext(AuthContext);

  const getNotePadData = () => {
    fetch("https://testbackend-cql1.onrender.com/getnotepadData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotepad(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getNotePadData();
  }, []);

  const handleSubmit = () => {
    fetch("https://testbackend-cql1.onrender.com/savenotepadData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        data: notepad.data,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          setSaveMessage("//Savedd");
          setTimeout(() => {
            setSaveMessage("");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [fontsLoaded] = useFonts({
    Megazoid: require("../assets/fonts/Megazoid.ttf"),
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
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.topbar}>
            <Text style={styles.header}>
              {username[0] === "b"
                ? "Notepad for us 🐞"
                : username === "admin"
                ? "Notepad for ADMIN 🥐"
                : username === "hal9000"
                ? `Notepad for HAL9000 🐒🦴`
                : `Notepad for ${username.toUpperCase()}`}
            </Text>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.header}>logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.borderElem1}>
            <View style={styles.borderElem2}>
              <TextInput
                spellCheck={false}
                scrollEnabled
                editable
                multiline
                numberOfLines={10}
                maxLength={1000}
                style={styles.input}
                value={notepad.data}
                onChangeText={(newValue) => {
                  setNotepad((prev) => ({ ...prev, data: newValue }));
                }}
                onSubmitEditing={handleSubmit}
              />
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={handleSubmit} style={styles.save}>
              <Text style={styles.savetext}>Save</Text>
            </TouchableOpacity>
            <Text style={styles.savemessage}>{saveMessage}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Notepad;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: "98%",
    height: "95%",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
  },
  topbar: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    fontFamily: "Megazoid",
    fontSize: 18,
    color: "black",
    margin: 8,
  },
  borderElem1: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    width: "97%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  input: {
    borderRadius: 13,
    padding: 10,
    width: "99%",
    height: "99%",
    textAlignVertical: "top",
    fontSize: 14,
    fontFamily: "monospace",
    lineHeight: 16,
  },
  save: {
    width: 80,
    height: 45,
    margin: 5,
    marginLeft: 15,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "white",
  },
  savetext: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
    margin: 8,
  },
  bottom: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  savemessage: {
    fontFamily: "monospace",
    color: "green",
    alignSelf: "center",
    fontSize: 14,
    marginLeft: 5,
  },
});
