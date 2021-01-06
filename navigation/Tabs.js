import React, { useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Map from "../screens/Map";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Setting from "../screens/Setting";
import Insta from "../screens/Insta";

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
  route?.state?.routeNames[route.state.index] || "Home";

// props, navigation, route
export default ({ navigation, route }) => {
  // better than useEffect()
  useLayoutEffect(() => {
    const name = getHeaderName(route);
    navigation.setOptions({
      title: name,
    });
  }, [route]);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "홈") {
            iconName += "home";
          } else if (route.name === "목록") {
            iconName += "list";
          } else if (route.name === "지도") {
            iconName += "map";
          } else if (route.name === "설정") {
            iconName += "settings";
          } else if (route.name === "Instagram") {
            iconName += "star";
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "#364EB9" : "black"}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#fff",
          borderTopColor: "#fff",
        },
      }}
    >
      <Tabs.Screen name="홈" component={Home}></Tabs.Screen>
      <Tabs.Screen name="목록" component={Detail}></Tabs.Screen>
      <Tabs.Screen name="지도" component={Map}></Tabs.Screen>
      <Tabs.Screen name="Instagram" component={Insta}></Tabs.Screen>
      <Tabs.Screen options={{
        headerShown: true
      }} name="설정" component={Setting}></Tabs.Screen>
    </Tabs.Navigator>
  );
};
