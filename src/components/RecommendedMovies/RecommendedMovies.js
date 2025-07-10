import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import FilmCard from "../FilmCard/Filmcard";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const RecommendedMovies = ({ navigation }) => {
  const [direction, setDirection] = useState("horizontal");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

      if (!accessToken) {
        console.error("TMDB Access Token is not set in your .env file.");
        setLoading(false);
        return;
      }
      const url =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderedItem = ({ item }) => {
    const posterUrl = item.poster_path
      ? `${IMAGE_BASE_URL}${item.poster_path}`
      : "https://placehold.co/162x216/1a1a1a/ffffff?text=No+Image";

    return (
      <FilmCard
        id={item.id}
        title={item.title}
        rating={item.vote_average}
        poster={item.poster_path}
      />
    );
  };

  return (
    <View>
      <View style={styles.headerSection}>
        <View style={styles.sectionHeader}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
            {direction === "horizontal" ? "Recommended Movies" : "All Movies"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (direction === "horizontal") {
                setDirection("vertical");
              } else {
                setDirection("horizontal");
              }
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "400", color: "#EB2F3D" }}>
              {direction === "horizontal" ? "See All " : "See Less "}
              <AntDesign name="right" size={13} color="#EB2F3D" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#3a2734"
          style={{ marginTop: 50 }}
        />
      ) : direction === "horizontal" ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={movies}
          renderItem={renderedItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          key={direction}
          numColumns={2}
          data={movies}
          renderItem={renderedItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.verticalList}
        />
      )}
    </View>
  );
};

export default RecommendedMovies;

const styles = StyleSheet.create({
  headerSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },
  verticalList: {
    paddingHorizontal: 12,
    alignItems: "center",
    paddingBottom: 100,
  },
});
