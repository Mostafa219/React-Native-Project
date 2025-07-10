import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import FilmCard from '../FilmCard/Filmcard';

const RecomendationDetails = ({ recommendations }) => {
  let movies = recommendations?.results || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommendations</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie) => (
          <FilmCard key={movie.id} id={movie.id} title={movie.title} rating={movie.vote_average} poster={movie.poster_path} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecomendationDetails;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
   padding:20,
  },
  
});
