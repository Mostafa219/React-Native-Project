import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { getMovieDetailsByID } from "../../api/themoviedbApi";
import CardDetails from "../../components/CardDetails/CardDetails";
import ModalImg from "../../components/CardDetails/ModalImg";
import AntDesign from '@expo/vector-icons/AntDesign';
import RecomendationDetails from "../../components/CardDetails/RecomendationDetails";

const MovieDetails = ({ navigation, route }) => {
  const [isShow, setIsShow] = useState(false);
  const [movie, setMovie] = useState([]);

  let id = route.params.id;
  // fetch movies
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetailsByID(id);
    
      setMovie(data);
     
    };
    fetchMovie();
  }, [id]);
  const {
    title,
    overview,
    genres,
    vote_average,
    credits,
    videos,
    recommendations,
    similar,
    production_companies,
    poster_path,
    budget,
    release_date,
    runtime,
    revenue,
    vote_count,
    original_language,
  } = movie;



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* arrow */}
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="left" size={24} color="#fff" />
      </TouchableOpacity>
        {/* image */}
        <TouchableOpacity
          style={styles.imageBackground}
          onPress={() => {
            setIsShow(true);
          }}
        >
          <Image
            // source={require("../../../assets/MovieposterTrend.png")}
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
        </TouchableOpacity>
        {/* details */}
        <CardDetails movie={movie}  />
        {/* <ModalImg /> */}
        <ModalImg
          isShow={isShow}
          setIsShow={setIsShow}
          poster_path={poster_path}
        />
        {/* <RecommendedMovies /> */}
        <RecomendationDetails recommendations={recommendations}/>
      </ScrollView>

    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#111",

  },
  imageBackground: {
    width: 410,
    height: 500,
    borderBottomEndRadius: 70,
    borderBottomStartRadius: 70,
    overflow: "hidden",
  },
  imageStyle: {
    resizeMode: "contain",
  },
  modal: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  imgModal: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
  },
  iconModal: {
    position: "absolute",
    bottom: 50,
    right: "48%",
    color: "#c55",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 3,
    backgroundColor: "#1E1E1E",
    padding: 8,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  
  },
});
