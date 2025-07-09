import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FilmCard from './src/components/FilmCard/Filmcard';
import MovieCardTrend from './src/components/MovieCardTrend/MovieCardTrend';
import MovieDetails from './src/screens/MovieDetails/MovieDetails';

export default function App() {
  return (
    <View >
      <StatusBar style="auto" />

      <MovieDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
