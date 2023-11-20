import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde React Navigation

const PopularScreen = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const navigation = useNavigation(); // Obtiene el objeto navigation

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const apiKey = '6c7103a1f49a735dc992cccd6f9c3e68';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleMoviePress = (item) => {
    navigation.navigate('Detalles', { selectedItem: { ...item, media_type: 'movie' } });
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Películas Populares</Text>
      <ScrollView contentContainerStyle={styles.movieList}>
        {popularMovies.map((item, index) => (
          <TouchableOpacity key={item.id} style={styles.movieItem} onPress={() => handleMoviePress(item)}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  movieList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieItem: {
    width: "48%",
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
  },
});

export default PopularScreen;
