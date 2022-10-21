import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route, navigation }) {
  const { address } = route.params;
  console.log(address);

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const getCoordinates = async (address) => {
    const KEY = "aSm0nphUtbAWcEDmzHqDYqZOrnjisK7c";
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const { lat, lng } = data.results[0].locations[0].displayLatLng;
      console.log(lat, lng);
      setRegion({ ...region, latitude: lat, longitude: lng });
    } catch (e) {
      Alert.alert("Error fetching data");
    }
    Keyboard.dismiss();
  };

  useEffect(() => {
    getCoordinates(address);
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
