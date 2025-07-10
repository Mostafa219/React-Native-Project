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

export default function FilmCard({ movie, onDeleteFavorite }) {
  const { id, title, vote_average, poster_path } = movie;
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
    const filmData = { id, title, rating: vote_average, poster: poster_path };
    if (isFavorite) {
      await deleteFavorite(id);
      setIsFavorite(false);
    } else {
      await addFavorite(filmData);
      setIsFavorite(true);
    }
  };

  const goToDetails = () => {
    navigation.navigate("MovieDetails", { movie });
  };

  return (
    <TouchableOpacity onPress={goToDetails}>
      <View style={styles.filmcard}>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
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
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filmcard: {
    marginVertical: 20,
  },
  filmposter: {
    width: 140,
    height: 216,
    borderRadius: 39,
    overflow: "hidden",
    backgroundColor: "lightgray",
    justifyContent: "flex-end",
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
    width: 140,
    marginTop: 10,
    marginLeft: 3,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
