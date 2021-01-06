import React, { useState } from "react";
import { AppLoading } from "expo";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import Stack from "./navigation/Stack";

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image == "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
    const images = cacheImages([
      require("./assets/background/b2.jpg"),
      require("./assets/background/b11.jpg"),
      require("./assets/default.jpg")
    ]);
    const fonts = cacheFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setIsReady(true);
  
  return isReady ? (
    <>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
    <StatusBar barStyle="dark-content" />
    </>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      // onError={console.error}
    />
  );
}
