import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';

let guesses;
let secret;

export default function App() {

  const [input, setInput] = useState('');
  const [guidance, setGuidance] = useState('');

  const initiate = () => {
    setGuidance(`Guess a number between 1-100`);
    secret = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
  }

  useEffect(() => {
    initiate();
  }, [])

  const makeGuess = () => {
    const guess = Number(input);
    guesses++;

    if (guess < secret) {
      setGuidance(`${guess} is too low!`);
    } else if (guess > secret) {
      setGuidance(`${guess} is too high!`);
    } else {
      Alert.alert(`${guess} is correct! it took you ${guesses} guesses.`);
      initiate();
    }
    setInput('');
  }

  return (
    <View style={styles.container}>
      <Text>{guidance}</Text>
      <Text>{secret}</Text>
      <Text>{guesses}</Text>
      <TextInput style={styles.textbox}
        keyboardType='number-pad'
        onChangeText={text => setInput(text)}
        value={input}
        >
      </TextInput>
      <Button title="Make a guess" onPress={makeGuess} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    width: '50%',
    margin: 10,
  },
});
