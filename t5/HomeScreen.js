import { useState, useRef } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Alert,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [result, setResult] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [data, setData] = useState([]);
  const initialFocus = useRef(null);

  const calculate = (operator) => {
    const [number1, number2] = [Number(num1), Number(num2)];
    const plus = `${number1} ${operator} ${number2} = ` + (number1 + number2);
    const minus = `${number1} ${operator} ${number2} = ` + (number1 - number2);

    switch (operator) {
      case "+":
        setResult(number1 + number2);
        setData([...data, { key: plus }]);
        break;

      case "-":
        setResult(number1 - number2);
        setData([...data, { key: minus }]);
        break;
    }
    setNum1("");
    setNum2("");

    initialFocus.current.focus();
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>

      <TextInput
        style={styles.textbox}
        ref={initialFocus}
        keyboardType="number-pad"
        onChangeText={(text) => setNum1(text)}
        value={num1}
      ></TextInput>
      <TextInput
        style={styles.textbox}
        keyboardType="number-pad"
        onChangeText={(text) => setNum2(text)}
        value={num2}
      ></TextInput>
      <View style={styles.operators}>
        <View style={styles.buttons}>
          <Button title="+" onPress={() => calculate("+")} />
        </View>
        <View style={styles.buttons}>
          <Button title="-" onPress={() => calculate("-")} />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          title="History"
          onPress={() => navigation.navigate("History", { data })}
        />
      </View>
      <Text>History:</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
