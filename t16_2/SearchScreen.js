import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Keyboard, FlatList, Alert } from "react-native";
import { Header, Input, Button, Icon, ListItem } from "@rneui/themed";
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

export default function SearchScreen({ navigation }) {
  const [address, setAddress] = useState("");
  const [myLocations, setMylocations] = useState([]);
  const [city, setCity] = useState("");
  const fullAddress = address + " " + city;

  useEffect(() => {
    const itemsRef = ref(database, "/addresses");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const items = data
        ? Object.keys(data).map((key) => ({ key, ...data[key] }))
        : [];
      setMylocations(items);
    });
  }, []);

  const deleteItem = (item) => {
    remove(ref(database, "/addresses/" + item.key));
  };

  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      bottomDivider
      rightContent={() => (
        <Button
          title=""
          onPress={() =>
            Alert.alert(
              "Are you sure?",
              "Are you sure you want to delete this address?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    deleteItem(item);
                  },
                },

                {
                  text: "No",
                },
              ]
            )
          }
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <ListItem style={styles.listcontainer}>
        <ListItem.Content>
          <ListItem.Title>{item.address}</ListItem.Title>
        </ListItem.Content>
        <Button
          title="See map"
          onPress={() =>
            navigation.navigate("MapScreen", { address: item.address })
          }
        />
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Swipeable>
  );

  return (
    <View style={styles.container}>
      <Input
        placeholder="Type in address"
        label="PLACEFINDER"
        onChangeText={(address) => setAddress(address)}
        value={address}
      />
      <Input
        placeholder="Type in city"
        onChangeText={(city) => setCity(city)}
        value={city}
      />
      <Button
        onPress={() => {
          if (address === "" || city === "") {
            Alert.alert("Address and city please");
          } else {
            navigation.navigate("MapScreen", { address: fullAddress });
            Keyboard.dismiss();
            setAddress("");
            setCity("");
          }
        }}
      >
        {" "}
        Search
      </Button>
      <FlatList
        data={myLocations}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
