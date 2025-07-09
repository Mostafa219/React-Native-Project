import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecommendedMovies from "../../components/RecommendedMovies/RecommendedMovies";
import MovieCardTrend from "../../components/MovieCardTrend/MovieCardTrend";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111010" }}>
      <View style={homeStyles.trend}>
        <MovieCardTrend navigation={navigation} />
      </View>
      <View style={homeStyles.scrollar}>
        <RecommendedMovies navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const homeStyles = StyleSheet.create({
  wrapper: {
    marginTop: 28,
  },
});
