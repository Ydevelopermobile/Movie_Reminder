import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde React Navigation
import { ToastAndroid } from 'react-native';

const SearchScreen = () => {
  const navigation = useNavigation(); // Obtiene el objeto navigation
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchAll = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=6c7103a1f49a735dc992cccd6f9c3e68&query=${searchQuery}`
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching all:", error);
    }
  };

  const renderResultItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Favoritos', { selectedItem: item }); // Pasar el elemento seleccionado a FavoriteScreen
      // Muestra una notificación confirmando que se agregó a favoritos
      ToastAndroid.show('Añadido a favoritos', ToastAndroid.SHORT);
      }}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
        <Text>{item.title || item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Pelicula</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter movie, TV show, or more..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity style={styles.button} onPress={searchAll}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderResultItem}
        style={styles.resultList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: -20, // Ajuste vertical hacia arriba
  },
  button: {
    backgroundColor: "#ED2B2A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  resultList: {
    width: "100%",
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  poster: {
    width: 50,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default SearchScreen;