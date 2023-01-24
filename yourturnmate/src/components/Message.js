import React, {useContext, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {ChatContext} from '../context/ChatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  }, [message]);

  return (
    <View
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <View className="messageInfo">
        <Image
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <Text>just now</Text>
      </View>
      <View className="messageContent">
        <Text>{message.text}</Text>
        {message.img && <Image src={message.img} alt="" />}
      </View>
    </View>
  );
};

export default Message;
