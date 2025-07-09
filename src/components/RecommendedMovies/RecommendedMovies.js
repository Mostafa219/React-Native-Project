import React, { useState, useEffect } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const RecommendedMovies = ({ navigation }) => {
  const [direction, setDirection] = useState("horizontal");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState([]);
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
      : `https://placehold.co/160x240/1a1a1a/ffffff?text=No+Image`;

    return (
      <TouchableOpacity
        style={{
          position: "relative",
          width: 160,
          height: 280,
          marginInline: 10,
        }}
        onPress={() => navigation.navigate("FilmCard ", { movieId: item.id })}
      >
        <View
          style={{ borderRadius: 15, overflow: "hidden", marginBottom: 15 }}
        >
          <ImageBackground
            source={{ uri: posterUrl }}
            style={styles.productImage}
          ></ImageBackground>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            paddingInline: 5,
            color: "#fff",
          }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.headerSection}>
        <View>
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
              <Text
                style={{ fontSize: 13, fontWeight: "400", color: "#EB2F3D" }}
              >
                {direction === "horizontal" ? "See All " : "See Less "}
                <AntDesign name="right" size={13} color="#EB2F3D" />
              </Text>
            </TouchableOpacity>
          </View>
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
          horizontal={direction === "horizontal"}
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
          horizontal={direction === "horizontal"}
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
    paddingInline: 32,
  },
  sectionHeader: {
    paddingInline: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 19,
  },
  productImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    backgroundColor: "#eaeeef",
  },
  horizontalList: {
    paddingHorizontal: 22,
  },
  verticalList: {
    marginTop: 19,
    paddingHorizontal: 22,
    alignItems: "center",
    paddingBottom: 100,
  },
});
