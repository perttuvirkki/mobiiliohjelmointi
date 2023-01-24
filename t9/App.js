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
import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import { MAPS_API_KEY } from "@env";

export default function App() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [markers, setMarkers] = useState([]);

  const url_address = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_API_KEY}`;
  const url_restaurants = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude}%2C${location.longitude}&radius=500&type=restaurant&keyword=cruise&key=${MAPS_API_KEY}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url_address);
      const data = await response.json();
      console.log(data);

      setLocation({
        ...location,
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const findRestaurants = async () => {
    try {
      const response = await fetch(url_restaurants);
      const data = await response.json();
      setMarkers(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    findRestaurants();
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng,
            }}
            title={marker.name}
          />
        ))}
      </MapView>
      <View style={styles.spacer} />

      <TextInput
        style={{ fontSize: 18, width: 200, borderWidth: 1, padding: 5 }}
        placeholder={"Osoite"}
        value={address}
        onChangeText={setAddress}
      />
      <Button title="SHOW" onPress={fetchData} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <StatusBar style="auto" />
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
