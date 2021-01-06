import React, { useState } from "react";
import { Button, Settings, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export default ({}) => {

  return (
    <WebView
      source={{ uri: "https://www.instagram.com/p/CF_NT2JActR/" }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  value: {
    fontSize: 24,
    marginVertical: 12
  }
});
