import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { MaterialIcons  } from '@expo/vector-icons';// Importa el ícono de MaterialCommunityIcons desde '@expo/vector-icons'
import { ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [platforms, setPlatforms] = useState([]);
  const [mediaDetails, setMediaDetails] = useState(null);
  const apiKey = '6c7103a1f49a735dc992cccd6f9c3e68'; // Tu API key de TMDb
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [genres, setGenres] = useState([]);
  
  const checkIsFavorite = async () => {
    try {
      const storedList = await AsyncStorage.getItem('favoriteList');
      const parsedList = storedList ? JSON.parse(storedList) : [];
      setFavoriteList(parsedList);

      if (parsedList.some(item => item.id === mediaDetails.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  useEffect(() => {
    // Verificar si la película está marcada como favorita cada vez que mediaDetails cambie
    if (mediaDetails) {
      checkIsFavorite();
    }
  }, [mediaDetails]);

  
  useEffect(() => {
    if (route.params?.selectedItem) {
      setMediaDetails(route.params.selectedItem);
    }
  }, [route.params]);
 
  
  useEffect(() => {
    const fetchWatchProviders = async () => {
      try {
        if (mediaDetails && mediaDetails.media_type && mediaDetails.id) {
          const response = await axios.get(`https://api.themoviedb.org/3/${mediaDetails.media_type}/${mediaDetails.id}/watch/providers?api_key=${apiKey}`);
          setPlatforms(response.data.results.BO?.flatrate || []);
        }
      } catch (error) {
        console.error('Error fetching watch providers:', error);
      }
    };
  
    if (mediaDetails) {
      fetchWatchProviders();
    }
  }, [mediaDetails, apiKey]);
  


  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const addToFavorites = async () => {
    try {
      // Agregar la película a la lista de favoritos (puedes usar AsyncStorage o el método que utilices)
      // Aquí `mediaDetails` representa la película actual
      // Guardar mediaDetails en AsyncStorage o en la lista de favoritos, según tu implementación
      // Ejemplo de cómo enviar la película a FavoriteScreen a través de la navegación
      showToast('Añadido a Favoritos');
      navigation.navigate('Favoritos', { selectedItem: mediaDetails });
      
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
 
  const removeFromFavorites = async () => {
    try {
      const storedList = await AsyncStorage.getItem('favoriteList');
      const parsedList = storedList ? JSON.parse(storedList) : [];
  
      const updatedList = parsedList.filter(item => item.id !== mediaDetails.id);
  
      // Actualiza el estado local y AsyncStorage después de la eliminación
      setFavoriteList(updatedList);
      await AsyncStorage.setItem('favoriteList', JSON.stringify(updatedList));
  
      showToast('Eliminado de Favoritos');
      navigation.navigate('Favoritos', { updatedList: updatedList });

    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  
  
    
  

  // Resto del código...

  // En algún lugar del código, llamar a addToFavorites al hacer clic en el ícono de favorito
  // Por ejemplo, en tu función toggleFavorite()
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      removeFromFavorites(mediaDetails); // Llama a esta función al desmarcar la película como favorita
    } else {
      addToFavorites(); // Llama a esta función al marcar la película como favorita
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      {mediaDetails && (
        <>
          <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20 }}>
            {mediaDetails.title || mediaDetails.name} ({mediaDetails.original_title || mediaDetails.original_name})
          </Text>
          {mediaDetails.poster_path && (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}` }}
              style={{ width: 300, height: 450, alignSelf: "center", marginBottom: 20, borderRadius: 15 }}
            />
          )}
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Descripción General</Text>
          <Text>{mediaDetails.overview}</Text>
          
          
          
          <View style={styles.favoriteIconContainer}>
          <TouchableOpacity onPress={toggleFavorite}>
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite'}
              size={40}
              color={isFavorite ? 'red' : '#999'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.platformTitle}>Plataformas</Text>

          {platforms.length > 0 ? (
            platforms.map((platform) => (
              <View key={platform.provider_id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                {platform.logo_path && (
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${platform.logo_path}` }}
                    style={{ width: 40, height: 40, marginRight: 10, borderRadius: 20 }}
                  />
                )}
                <Text>{platform.provider_name}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.description}>No disponible en ninguna plataforma</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    textAlign: 'justify',
    marginBottom: 20,
  },
  favoriteIconContainer: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'left',
    marginTop: 10, // Ajusta el espacio entre la sección anterior y el ícono de favorito
  },
  platformTitle: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  genre: {
    backgroundColor: '#ddd',
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});

export default DetailScreen;

