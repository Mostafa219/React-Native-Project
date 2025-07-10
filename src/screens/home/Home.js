import { StyleSheet, View, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecommendedMovies from "../../components/RecommendedMovies/RecommendedMovies";
import MovieCardTrend from "../../components/MovieCardTrend/MovieCardTrend";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111010" }}>
      <StatusBar barStyle="light-content" backgroundColor="#111010" />
      <FlatList
        contentContainerStyle={styles.scrollContent}
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
    </SafeAreaView>
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
