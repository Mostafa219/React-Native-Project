import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addFavorite,
  deleteFavorite,
  favoriteExists,
} from "../../lib/favorites/utilitys.js";

export default function SearchCard({
  id,
  title,
  rating,
  poster,
  onDeleteFavorite,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

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
      if (onDeleteFavorite) onDeleteFavorite(id);
      setIsFavorite(false);
    } else {
      await addFavorite(filmData);
      setIsFavorite(true);
    }
  };

  const goToDetails = () => {
    navigation.navigate("MovieDetails", { id });
  };

  return (
    <TouchableOpacity onPress={goToDetails}>
      <View style={styles.filmcard}>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
          style={styles.filmposter}
          imageStyle={styles.imageStyle}
        >
          <TouchableOpacity
            style={styles.favIconContainer}
            onPress={toggleFavorite}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filmcard: {
  },
  filmposter: {
    width: 112,
    height: 149,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: "cover",
  },
  favIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#1E1E1E",
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
    fontFamily: 'Inter',
    width: 100,
  },
});
