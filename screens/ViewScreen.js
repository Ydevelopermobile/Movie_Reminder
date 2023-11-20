import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import axios from "axios";

const ViewScreen = ({ route }) => {
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [mediaDetails, setMediaDetails] = useState(null);
  const apiKey = '6c7103a1f49a735dc992cccd6f9c3e68'; // Tu API key de TMDb

  useEffect(() => {
    if (route.params?.selectedItem) {
      setMediaDetails(route.params.selectedItem);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        if (route.params?.selectedItem) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/${route.params.selectedItem.media_type}/${route.params.selectedItem.id}?api_key=${apiKey}&language=es-ES`
          );
          setMediaDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching media details:', error);
      }
    };
  
    if (route.params?.selectedItem) {
      fetchMediaDetails();
    }
  }, [route.params, apiKey]);
  
  useEffect(() => {
    const fetchWatchProviders = async () => {
      try {
        if (mediaDetails && mediaDetails.media_type && mediaDetails.id) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/${mediaDetails.media_type}/${mediaDetails.id}/watch/providers?api_key=${apiKey}`
          );
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
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (mediaDetails && mediaDetails.media_type && mediaDetails.id) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/${mediaDetails.media_type}/${mediaDetails.id}?api_key=${apiKey}&language=es-ES`
          );
          setGenres(response.data.genres || []);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
  
    if (mediaDetails) {
      fetchGenres();
    }
  }, [mediaDetails, apiKey]);
  

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
          <Text style={{ fontSize: 20, marginTop: 5 }}>Géneros</Text>
        <View style={styles.genresContainer}>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <View key={genre.id} style={styles.genre}>
                <Text>{genre.name}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.description}>No disponible</Text>
          )}
        </View>
          <Text style={{ fontSize: 20, marginTop: 20 }}>Plataformas</Text>
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

export default ViewScreen;
