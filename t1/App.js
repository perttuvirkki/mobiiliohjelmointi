import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';
import React, { useState, useRef } from 'react';

export default function App() {

  const [result, setResult] = useState('');
  const [num1, setNum1] = useState(''); 
  const [num2, setNum2] = useState('');
  
  const initialFocus = useRef(null);
  
  const calculate = operator => {
    const [number1, number2] = [Number(num1), Number(num2)];

    switch (operator) {
      case '+':
        setResult(number1+number2);
        break;

      case '-':
        setResult(number1-number2);
        break;
    }
    setNum1('');
    setNum2('');
    initialFocus.current.focus();
  }


  return (
    
    <View style={styles.container}>
      
      
      <Text>Result: {result}</Text>

      <TextInput style={styles.textbox} ref={initialFocus}
        keyboardType='number-pad'
        onChangeText={text => setNum1(text)}
        value={num1}>
      </TextInput>
      <TextInput style={styles.textbox}
        keyboardType='number-pad'
        onChangeText={text => setNum2(text)}
        value={num2}>
      </TextInput>
      <View style={styles.operators}>
        <View style={styles.buttons}>
          <Button title="+" onPress={() => calculate('+')} />
        </View>
        <View style={styles.buttons}>
          <Button title="-" onPress={() => calculate('-')} />
        </View>
      </View>

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

  operators: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttons: {
    width: '20%',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  }
});
