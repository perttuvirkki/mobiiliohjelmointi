import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";

export default function App() {
  const [list, setList] = useState("");
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  const calculate = (operator) => {
    switch (operator) {
      case "Add":
        setData([...data, { key: `${list}` }]);
        break;
      case "Clear":
        setData([]);
        break;
    }
    setList("");

    initialFocus.current.focus();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textbox}
        ref={initialFocus}
        keyboardType="default"
        onChangeText={(text) => setList(text)}
        value={list}
      ></TextInput>
      <View style={styles.operators}>
        <View style={styles.buttons}>
          <Button title="Add" onPress={() => calculate("Add")} />
        </View>
        <View style={styles.buttons}>
          <Button title="Clear" onPress={() => calculate("Clear")} />
        </View>
      </View>

      <Text>SHOPPING LIST</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    top: "20%",
  },

  textbox: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    width: "50%",
    margin: 10,
  },

  operators: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  buttons: {
    width: "40%",
    borderColor: "black",
    borderWidth: 5,
    margin: 10,
  },
});
