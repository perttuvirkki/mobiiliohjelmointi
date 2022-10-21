import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBd2qESDGEM8A_UaYzRYzyb83YDXGJP3I",
  authDomain: "mobiiliteht16.firebaseapp.com",
  databaseURL: "https://mobiiliteht16-default-rtdb.firebaseio.com",
  projectId: "mobiiliteht16",
  storageBucket: "mobiiliteht16.appspot.com",
  messagingSenderId: "822956927268",
  appId: "1:822956927268:web:5398a33add0cc73be82bb1",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

  const saveItem = () => {
    push(ref(database, "/addresses"), { address: address });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} />
      </MapView>
      <Button
        onPress={() => {
          saveItem();
          Alert.alert("Saved to favourites!");
        }}
      >
        <Icon name="save" color="white"></Icon>
        SAVE TO FAVOURITES
      </Button>
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
