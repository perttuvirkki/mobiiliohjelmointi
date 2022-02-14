import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Picker,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [selectedValue, setSelectedValue] = useState("");
  const [alldata, setAlldata] = useState([]);
  const [currencyvalue, setCurrencyvalue] = useState([]);
  const [keyword, setKeyword] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = () => {
    fetch(
      "http://api.exchangeratesapi.io/latest?access_key=da303e5ede9ea02a4f72af84f0b588c9"
    )
      .then((response) => response.json())
      .then((data) => setAlldata(data.rates))
      .catch((error) => {
        Alert.alert("Error", error);
      });
    setCurrencyvalue(Object.values(alldata));
  };

  const calculate = () => {
    getRepositories();
    setText(keyword / currencyvalue[selectedValue] + "€");
  };

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <View style={styles.spacer} />

      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        itemStyle={{ height: 44 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {Object.keys(alldata).map((item, index) => {
          return <Picker.Item label={item} value={index} key={index} />;
        })}
      </Picker>
      <View style={styles.spacer} />

      <TextInput
        style={{ fontSize: 18, width: 200, borderWidth: 1, padding: 5 }}
        placeholder="number"
        onChangeText={(text) => setKeyword(text)}
      />
      <View style={styles.spacer} />

      <Button title="Convert" onPress={() => calculate()} />

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
  },
  spacer: {
    height: 32,
    width: 32,
  },
});
