import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import {
  addFavorite,
  deleteFavorite,
  favoriteExists,
} from "../../lib/favorites/utilitys";

const CardDetails = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    id,
    title,
    overview,
    genres,
    vote_average,
    release_date,
    runtime,
    original_language,
    poster_path,
  } = movie;
  let poster=`https://image.tmdb.org/t/p/w500${poster_path}`
  useEffect(() => {
    const checkFavorite = async () => {
      const exists = await favoriteExists(id);
      console.log("exists", exists);
      setIsFavorite(exists);
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    const filmData = { id, title, vote_average, poster };
    console.log("filmData", filmData);
    if (isFavorite) {
      await deleteFavorite(id);
    //   if (onDeleteFavorite) onDeleteFavorite(id);
      setIsFavorite(false);
    } else {
      await addFavorite(filmData);
      setIsFavorite(true);
    }
  };

  return (
    <View style={styles.detailsContainer}>
      <View style={[styles.row, styles.borderBottom]}>
        <View>
          <Text style={styles.title}>
            {(title ?? "").split(" ").slice(0, 5).join(" ")}
          </Text>
          <View style={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <AntDesign
                key={i}
                name="star"
                size={20}
                color={i < vote_average / 2 ? "#fff" : "black"}
                style={styles.iconStar}
              />
            ))}
            <Text style={styles.rate}>{Math.floor(vote_average)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.favIconContainer}
          onPress={toggleFavorite}
        >
          <Entypo
            name="heart"
            size={36}
            style={isFavorite ? styles.activeFavIcon : styles.favIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.text}>Language:</Text>
          <Text style={styles.text}>
            {original_language === "en"
              ? "English"
              : original_language === "fr"
              ? "French"
              : original_language}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Duration:</Text>
          <Text style={styles.text}>{runtime} Min</Text>
        </View>
        <View>
          <Text style={styles.text}>Release Date:</Text>
          <Text style={styles.text}>{release_date}</Text>
        </View>
      </View>

      <View style={styles.borderBottom}>
        <Text style={styles.text}>Categories</Text>
        <View style={styles.category}>
          {genres?.map((genre, index) => (
            <Text style={styles.categoryText} key={index}>
              {genre.name}
            </Text>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.text}>{overview}</Text>
      </View>
    </View>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    paddingTop: 25,
    padding: 20,
    width: "85%",
    backgroundColor: "#1E1E1E",
    borderRadius: 50,
    marginBottom: 30,
    marginHorizontal: "auto",
    marginTop: -100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "#fff",
    marginVertical: 3,
  },
  description: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 15,
  },
  category: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginVertical: 10,
  },
  categoryText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#c55",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  favIconContainer: {
    backgroundColor: "#2E2E2E",
    padding: 8,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  favIcon: {
    fontSize: 20,
    color: "gray",
  },
  activeFavIcon: {
    fontSize: 20,
    color: "#c33",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconStar: {
    marginHorizontal: 2,
  },
  rate: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ccc",
  },
});
