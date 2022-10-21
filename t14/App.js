import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [text, setText] = useState("I am your father");
  const speak = () => {
    Speech.speak(text, { pitch: 0.1, rate: 0.5, language: "fi-FI" });
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <Text>Text to speech!</Text>
      <TextInput
        placeholder="I am your father"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button title="Speak up" onPress={speak} />
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
});
