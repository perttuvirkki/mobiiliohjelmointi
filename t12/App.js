import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, set } from "firebase/database";

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
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [shopping, setShopping] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "/items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const items = data
        ? Object.keys(data).map((key) => ({ key, ...data[key] }))
        : [];
      setShopping(items);
    });
  }, []);

  const saveItem = () => {
    console.log({ product, amount });
    push(ref(database, "/items"), { product: product, amount: amount });
    setAmount("");
    setProduct("");
  };

  const deleteItem = (item) => {
    console.log(item);
    set(ref(database, "/items/" + item.key), null);
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <TextInput
        placeholder="Product"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <TextInput
        placeholder="Amount"
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20, marginBottom: 15 }}>
        Shopping list
      </Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#0000ff" }}
              onPress={() => deleteItem(item)}
            >
              {" "}
              bought
            </Text>
          </View>
        )}
        data={shopping}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  spacer: {
    height: 32,
    width: 32,
  },
});
