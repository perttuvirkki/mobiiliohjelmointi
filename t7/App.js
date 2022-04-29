import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Picker,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [rates, setRates] = useState({});
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [eur, setEur] = useState("");

  const getData = async () => {
    const url =
      "http://api.exchangeratesapi.io/latest?access_key=da303e5ede9ea02a4f72af84f0b588c9";

    try {
      const response = await fetch(url);
      const currencyData = await response.json();
      setRates(currencyData.rates);
    } catch (e) {
      Alert.alert("Error fetching data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const calculate = () => {
    const amountEur = Number(amount) / rates[selected];
    setEur(`${amountEur.toFixed(2)}€`);
  };

  return (
    <View style={styles.container}>
      <Text>{eur}</Text>
      <View style={styles.spacer} />

      <Picker
        selectedValue={selected}
        style={{ height: 50, width: 150 }}
        itemStyle={{ height: 44 }}
        onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
      >
        {Object.keys(rates)
          .sort()
          .map((key) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
      </Picker>
      <View style={styles.spacer} />

      <TextInput
        style={{ fontSize: 18, width: 200, borderWidth: 1, padding: 5 }}
        placeholder="number"
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      />
      <View style={styles.spacer} />

      <Button title="Convert" onPress={calculate} />

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

/* Ohjelma toimii kun muutaman kerran painelee convert nappulaa */
