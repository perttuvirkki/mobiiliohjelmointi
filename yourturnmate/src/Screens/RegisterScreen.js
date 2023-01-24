import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {auth, db, storage, data} from '../../firebase/firebaseConfig';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {doc, setDoc, getDocs, collection} from 'firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

export const RegisterScreen = ({navigation}) => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState();

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async downloadURL => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userTurns', res.user.uid), {});
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log(err);
    }
  };

  const addPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const imageUri = image.sourceURL;
      setFile(imageUri);
    });
  };

  return (
    <View>
      <Text>Welcome to YourTurn!</Text>
      <Text>Register</Text>
      <TextInput
        required
        type="text"
        placeholder="display name"
        value={displayName}
        onChangeText={text => setDisplayName(text)}
      />
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
      <Button onPress={addPhoto} title="Add photo"></Button>
      <Button onPress={handleSubmit} title="Sign up"></Button>
      <Text onPress={() => navigation.navigate('LoginScreen')}>
        Already have an account? Sign in
      </Text>
      {loading && (
        <Text>Uploading and compressing the image please wait...</Text>
      )}
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
