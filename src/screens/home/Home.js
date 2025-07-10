import { StyleSheet, View, FlatList, StatusBar } from "react-native";
import RecommendedMovies from "../../components/RecommendedMovies/RecommendedMovies";
import MovieCardTrend from "../../components/MovieCardTrend/MovieCardTrend";

const Home = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#111010" />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.trend}>
              <MovieCardTrend navigation={navigation} />
            </View>
            <View style={styles.recommended}>
              <RecommendedMovies navigation={navigation} />
            </View>
          </>
        }
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  trend: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  recommended: {
    marginTop: 10,
  },
});
