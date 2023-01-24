import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {auth} from '../../firebase/firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

export const LoginScreen = ({navigation}) => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Welcome to YourTurn!</Text>
      <Text>Login</Text>
      <TextInput
        required
        type="email"
        keyboardType="email-address"
        placeholder="email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        required
        type="password"
        placeholder="password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button onPress={handleSubmit} title="Sign in"></Button>
      <Text onPress={() => navigation.navigate('RegisterScreen')}>
        New here? Register!
      </Text>
      {loading && <Text>Please wait...</Text>}
      {err && <Text>Something went wrong</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
