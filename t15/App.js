import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, View, FlatList, Keyboard, Alert } from "react-native";
import { Header, Input, Button, ListItem, Icon } from "@rneui/themed";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_A4JwdtzAedMkteJ13HEb0TAXw9BSAOU",
  authDomain: "mobiiliteht12.firebaseapp.com",
  databaseURL: "https://mobiiliteht12-default-rtdb.firebaseio.com",
  projectId: "mobiiliteht12",
  storageBucket: "mobiiliteht12.appspot.com",
  messagingSenderId: "543565492849",
  appId: "1:543565492849:web:7b3ffcfcf774204ce961d0",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "/items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const items = data
        ? Object.keys(data).map((key) => ({ key, ...data[key] }))
        : [];
      setList(items);
    });
  }, []);

  const saveItem = () => {
    push(ref(database, "/items"), { product: product, amount: amount });
    setAmount("");
    setProduct("");
    Keyboard.dismiss();
  };

  const deleteItem = (item) => {
    remove(ref(database, "/items/" + item.key));
  };

  const renderItem = ({ item }) => (
    <ListItem style={styles.listcontainer} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        type="material"
        color="red"
        name="delete"
        onPress={() => deleteItem(item)}
      />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Header
        // leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "SHOPPING LIST", style: { color: "#fff" } }}
        // rightComponent={{ icon: "home", color: "#fff" }}
      />
      <Input
        placeholder="Product"
        label="PRODUCT"
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <Input
        placeholder="Amount"
        label="AMOUNT"
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button
        onPress={() => {
          if (product === "") {
            Alert.alert("Add a product");
          } else {
            saveItem();
          }
        }}
      >
        <Icon name="save" color="white"></Icon>
        Save
      </Button>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  spacer: {
    height: 32,
    width: 32,
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
