import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contact, setContact] = useState([]);
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContact(data);
      }
    }
    console.log(contact);
    console.log(contact[2].firstName);
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Contacts app!</Text>

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.name}, {item.phoneNumbers[0].number}
            </Text>
          </View>
        )}
        data={contact}
        ItemSeparatorComponent={listSeparator}
      />
      <Button title="Get Contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: "10%",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
