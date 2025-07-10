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
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const fetchData = async () => {
    const accessToken = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("TMDB Access Token is not set in your .env file.");
      setLoading(false);
      return;
    }

    // Append page number to the API URL
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}`;
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
      // Append new movies to the existing list
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    if (loadingMore) {
      return;
    }
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  const renderFooter = () => {
    return loadingMore ? (
      <ActivityIndicator
        size="large"
        color="#3a2734"
        style={{ marginVertical: 20 }}
      />
    ) : null;
  };

  const renderedItem = ({ item }) => {
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
            Recommended Movies
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
      {loading && page === 1 ? (
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
          keyExtractor={(item) => item.id.toString() + Math.random()}
          contentContainerStyle={styles.horizontalList}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          key={direction}
          numColumns={2}
          data={movies}
          renderItem={renderedItem}
          keyExtractor={(item) => item.id.toString() + Math.random()}
          contentContainerStyle={styles.verticalList}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
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
