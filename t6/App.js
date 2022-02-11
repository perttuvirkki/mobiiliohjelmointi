import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => response.json())
      .then((data) => setRepositories(data.meals))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipe}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.strMeal}
            </Text>
            <Image
              source={{
                uri: item.strMealThumb,
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}
        data={repositories}
      />
      <View style={styles.spacer} />

      <TextInput
        style={{ fontSize: 18, width: 200, borderWidth: 1, padding: 5 }}
        placeholder="keyword"
        onChangeText={(text) => setKeyword(text)}
      />
      <Button title="Find" onPress={getRepositories} />
      <View style={styles.spacer} />
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

  recipe: {
    borderBottomWidth: 5,
    borderBottomColor: "black",
    padding: 10,
  },

  spacer: {
    height: 32,
    width: 32,
  },
});
