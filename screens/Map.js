import React, { useEffect, useState, useLayoutEffect, createRef, useRef } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import useStateWithCallback from "use-state-with-callback";



export default ({route}) => {
  const [location, setLocation] = useStateWithCallback(null, () => {
    if(location !== null) changeRegion();
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  const changeRegion= () => {
    console.log(location)
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },4000)
  }

  
  useFocusEffect(() => {
    if (route.params !== undefined) {
      setLocation({
        latitude: parseFloat(route.params.targetLocation.xpoint),
        longitude: parseFloat(route.params.targetLocation.ypoint),
        latitudeDelta: 0,
        longitudeDelta: 0,
      })

    }
  });

  useLayoutEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치권한이 거부되었습니다.");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={true}
        region={location}
        ref={mapRef}
        minZoomLevel={16}
        // onRegionChange={()=>console.log('change')}
        // onRegionChangeComplete={()=>console.log('complete')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
