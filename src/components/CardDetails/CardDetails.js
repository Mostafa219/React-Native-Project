import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const CardDetails = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);
  const {
    title,
    overview,
    genres,
    vote_average,
    release_date,
    runtime,
    original_language,
  } = movie;

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
          onPress={() => setIsFav(!isFav)}
        >
          <Entypo
            name="heart"
            size={36}
            style={isFav ? styles.activeFavIcon : styles.favIcon}
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
    position: "absolute",
    bottom: "-40%",
    width: 340,
    borderRadius: 50,
    backgroundColor: "#1E1E1E",
    zIndex: 3,
    alignSelf: "center",
    transform: [{ translateX: -195 }],
    left: "50%",
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
