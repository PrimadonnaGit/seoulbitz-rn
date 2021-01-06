import React, { useState, useRef, useLayoutEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { seoulbitzApi } from "../api";
import { useNavigation } from "@react-navigation/native";
import useStateWithCallback from "use-state-with-callback";

export default ({}) => {
  
  const [subway, setSubway] = useState("");
  const [keyboard, setKeyboard] = useState(false);
  const isInitialMount = useRef(true);
  const navigation = useNavigation();
  
  const [place, setPlace] = useStateWithCallback(
    {
      nearFoodiePlace: [],
      nearFoodiePlaceError: null,
      // nearShopPlace: [],
      // nearShopPlaceError: null,
    },
    (place) => {
      if (subway.length) {
        navigation.navigate("Search", {
          nearFoodiePlace: place.nearFoodiePlace.sort(
            (a, b) => a.Distance - b.Distance
          ),
        });
      }
    }
  );

  // const _keyboardDidShow = () => setKeyboard(true);
  // const _keyboardDidHide = () => setKeyboard(false);

  const getData = async (subway) => {
    const [
      nearFoodiePlace,
      nearFoodiePlaceError,
    ] = await seoulbitzApi.getNearFoodie(subway);
    // const [nearShopPlace, nearShopPlaceError] = await seoulbitzApi.getNearShop(subway);
    setPlace({
      nearFoodiePlace,
      nearFoodiePlaceError,
      // nearShopPlace,
      // nearShopPlaceError,
    });
  };

  const onChangeSubway = (e) => setSubway(e.nativeEvent.text);

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

    } else {
      if (subway) getData(subway);
    }

    // if (!Keyboard.listeners().length) {
    //   Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    //   Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    // }
  }, [subway]);

  return (
    <>
      <ImageBackground
        source={require(`../assets/background/b2.jpg`)}
        style={styles.background}
      >
        <View style={styles.mainContent}>
          <Text style={styles.title}>SeoulBitz Project</Text>
          <TextInput
            style={keyboard ? styles.inputOpen : styles.input}
            placeholder="Subway Station..."
            onEndEditing={onChangeSubway}
          ></TextInput>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 55,
    color: "#000",
    marginVertical: "20%",
  },
  input: {
    width: "90%",
    height: 45,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: "60%",
    borderRadius: 5,
    fontSize: 20,
    paddingLeft: 5,
  },
  inputOpen: {
    width: "90%",
    height: 45,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: "40%",
    borderRadius: 5,
    fontSize: 20,
    paddingLeft: 5,
  },
});
