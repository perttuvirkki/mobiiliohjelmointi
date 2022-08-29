import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  // Location example
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  };
  const [region, setRegion] = useState(initial);
  const [address, setAddress] = useState(""); // State where location is saved

  const getCoordinates = async (location) => {
    const KEY = "aSm0nphUtbAWcEDmzHqDYqZOrnjisK7c";
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${location}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const { lat, lng } = data.results[0].locations[0].latLng;
      console.log(lat, lng);
      setRegion({ ...region, latitude: lat, longitude: lng });
    } catch (e) {
      Alert.alert("Error fetching data");
    }
    Keyboard.dismiss();
  };

  // Mapview example

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} />
      </MapView>
      <View style={styles.spacer} />

      <TextInput
        style={{ fontSize: 18, width: 200, borderWidth: 1, padding: 5 }}
        placeholder={"Osoite"}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Button title="SHOW" onPress={() => getCoordinates(address)} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
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
  spacer: {
    height: 32,
    width: 32,
  },
});
