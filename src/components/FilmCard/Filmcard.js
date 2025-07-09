import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  addFavorite,
  deleteFavorite,
  favoriteExists,
} from '../../lib/favorites/utilitys.js';

export default function FilmCard({ id, title, rating, poster }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const exists = await favoriteExists(id);
      setIsFavorite(exists);
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    const filmData = { id, title, rating, poster };
    if (isFavorite) {
      await deleteFavorite(id);
      setIsFavorite(false);
    } else {
      await addFavorite(filmData);
      setIsFavorite(true);
    }
  };

  return (
    <View style={styles.filmcard}>
      <ImageBackground
        source={typeof poster === 'string' ? { uri: poster } : poster}
        style={styles.filmposter}
        imageStyle={styles.imageStyle}
      >
        <TouchableOpacity style={styles.favIconContainer} onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>⭐ {rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filmcard: {
    marginVertical: 20,
  },
  filmposter: {
    width: 162,
    height: 216,
    borderRadius: 39,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  favIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#1E1E1E',
    padding: 8,
    borderRadius: 22,
  },
  titleContainer: {
    marginTop: 10,
    marginLeft: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  rating: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
});
