import * as React from "react";
import Homepage from "./Homepage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Homepage} />
    </Stack.Navigator>
  );
};

export default App;
