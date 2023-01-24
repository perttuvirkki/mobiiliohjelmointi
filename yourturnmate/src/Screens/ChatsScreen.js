import {doc, onSnapshot} from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Flatlist,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {ChatContext} from '../context/ChatContext';
import {db} from '../../firebase/firebaseConfig';

const ChatsScreen = () => {
  const [chats, setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userTurns', currentUser.uid), doc => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = u => {
    dispatch({type: 'CHANGE_USER', payload: u});
  };

  return (
    <View className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(chat => (
          <View
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}>
            <Image src={chat[1].userInfo.photoURL} alt="" />
            <View className="userChatInfo">
              <Text>{chat[1].userInfo.displayName}</Text>
              <Text>{chat[1].lastMessage?.text}</Text>
            </View>
          </View>
        ))}
      <Flatlist
        data={chats}
        renderItem={({chat}) => (
          <View
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}>
            <Image src={chat[1].userInfo.photoURL} alt="" />
            <View className="userChatInfo">
              <Text>{chat[1].userInfo.displayName}</Text>
              <Text>{chat[1].lastMessage?.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ChatsScreen;
