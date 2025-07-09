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


const MovieDetails = () => {
  const [isShow, setIsShow] = useState(false);
  const [movie, setMovie] = useState([]);
 

  let id = 541671;
  // fetch movies
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetailsByID(id);
      console.log("data", data);
      setMovie(data);
      console.log(data);

      // try{

      //   const res = await fetch( `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.EXPO_PUBLIC_API_KEY}`);
      //   const data = await res.json();
      //   console.log("data", data);
      //   setMovie(data);
      //   console.log(data);
      // }catch(error){
      //   console.log(error);
      // }
    };
    fetchMovie();
  }, []);
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
        <CardDetails movie={movie} />
          {/* <ModalImg /> */}
          <ModalImg isShow={isShow} setIsShow={setIsShow} poster_path={poster_path} />
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
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
});
