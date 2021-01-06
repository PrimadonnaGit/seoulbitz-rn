import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import Search from "../screens/Search";
import Setting from "../screens/Setting";

const Stack = createStackNavigator();

export default ({ route }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "#fff",
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1,
      },
      headerTintColor: "black",
      headerBackTitleVisible: false,
      headerShown: false,
    }}
  >
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Search"
      component={Search}
    />
  </Stack.Navigator>
);
