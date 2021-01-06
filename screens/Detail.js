import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  Linking,
} from "react-native";
import { seoulbitzApi } from "../api";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const defaultImage = require("../assets/default.jpg");

const ProductImage = ({ place }) => {
  const [error, setError] = useState(false);

  if (!error) {
    return (
      <Image
        style={styles.thumb}
        // key={place.thumb1}
        source={{ uri: place.thumb1 }}
        onError={() => setError(true)}
      ></Image>
    );
  } else {
    // return null;
    return (
      <View style={styles.defaultView}>
        <ImageBackground
          style={styles.defaultImage}
          // key={place.thumb1}
          source={defaultImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.defaultText}>이미지 준비중 ...</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

export default ({route}) => {
  const [place, setPlace] = useState({
    foodiePlace: [],
    // shopPlace: [],
    foodiePlaceError: null,
    // shopPlaceError: null,
  });
  const navigation = useNavigation();

  const getData = async () => {
    const [foodiePlace, foodiePlaceError] = await seoulbitzApi.getFoodie();
    // const [shopPlace, shopPlaceError] = await seoulbitzApi.getShop();
    setPlace({
      foodiePlace,
      // shopPlace,
      foodiePlaceError,
      // shopPlaceError,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* <View style={styles.topNav}>
        <Button style={styles.btn} title="Foodie"></Button>
        <Button style={styles.btn} title="Shop"></Button>
      </View> */}
        {place.foodiePlace.map((place, idx) => {
          if (idx < 100) {
            return (
              <View style={styles.place} key={place.uniq}>
                <ProductImage place={place}></ProductImage>

                <View style={styles.placeInfo}>
                  <View style={styles.placeDetails}>
                    <Text style={styles.placeTitle}>{place.title}</Text>
                    <View style={styles.placeClickAble}>
                      <MaterialCommunityIcons
                        name="heart-outline"
                        size={28}
                        color="black"
                        style={{ marginHorizontal: 5 }}
                      />
                      <AntDesign
                        name="instagram"
                        size={28}
                        color="black"
                        style={{ marginHorizontal: 5 }}
                        onPress={() => Linking.openURL(place.insta)}
                      />
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={28}
                        color="#000"
                        style={{ marginHorizontal: 5 }}
                        onPress={() => {
                          navigation.navigate("지도", {
                            targetLocation: {
                              xpoint: place.xpoint,
                              ypoint: place.ypoint,
                            },
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.placeDetails}>
                  <View style={styles.placeDetailLike}>
                    <Ionicons name="ios-thumbs-up" size={28} color="#065FD4" />
                    <Text style={styles.like}>{place.like_cnt}</Text>
                  </View>
                  <View style={styles.placeDetailMap}>
                    <Text style={styles.placeAddr}>{place.addr}</Text>
                  </View>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",

  },
  topNav: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btn: {},
  place: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  thumb: {
    width: "100%",
    height: 200,
    backgroundColor: "#f1eff0",
  },
  defaultView: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultImage: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultText: {
    fontSize: 35,
    color: "#000",
  },
  placeInfo: {
    flex: 1,
    margin: 10,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  placeTitle: {
    width: "80%",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "left",
  },
  placeDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 5,
  },
  placeDetailLike: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  placeDetailMap: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  placeAddr: {
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    // marginHorizontal: 5,
  },
  placeClickAble: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  like: {
    fontSize: 20,
    marginHorizontal: 5,
  },
});
