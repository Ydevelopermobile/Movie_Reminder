import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute, useFocusEffect  } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons'; // Importa los íconos de MaterialIcons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';



// Guardar la lista de favoritos en AsyncStorage
const saveFavoriteList = async (list) => {
  try {
    await AsyncStorage.setItem('favoriteList', JSON.stringify(list));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Recuperar la lista de favoritos desde AsyncStorage
const loadFavoriteList = async () => {
  try {
    const storedList = await AsyncStorage.getItem('favoriteList');
    return storedList !== null ? JSON.parse(storedList) : [];
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};


const FavoriteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [favoriteList, setFavoriteList] = useState([]);
    
  
  useEffect(() => {
    // Cargar la lista de favoritos al iniciar la pantalla
    loadFavoriteList().then((list) => setFavoriteList(list));
  }, []);
 

  useEffect(() => {
    // Guardar la lista de favoritos cada vez que cambie
    saveFavoriteList(favoriteList);
  }, [favoriteList]);
  
  useEffect(() => {
    if (route.params && route.params.updatedList) {
      setFavoriteList(route.params.updatedList);
    }
  }, [route.params]);
  

  useEffect(() => {
    if (route.params && route.params.selectedItem) {
      const selectedItem = route.params.selectedItem;
      // Agregar la película recibida al principio de la lista de favoritos
      setFavoriteList((prevList) => [selectedItem, ...prevList]);
    }
  }, [route.params]);
  

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
    
  const removeFromFavorites = (index) => {
    const updatedList = [...favoriteList];
    const removedItem = updatedList.splice(index, 1)[0];
    setFavoriteList(updatedList);
    showToast('Eliminado de Favoritos');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Buscar")}
          style={{
            backgroundColor: "#ED2B2A",
            width: 30,
            height: 30,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "white",
            }}
          >+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const viewItemDetails = (item) => {
    navigation.navigate('Ver', { selectedItem: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Favoritos</Text>
      <FlatList
        data={favoriteList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.favoriteItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.itemInfo}>
              <Text>{(item.title || item.name).length > 40 ? `${(item.title || item.name).substring(0, 28)}...` : item.title || item.name}</Text>

              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => viewItemDetails(item)}>
                  <MaterialIcons name="visibility" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromFavorites(index)}>
                  <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  favoriteItem: {
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
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
  },
});

export default FavoriteScreen;
