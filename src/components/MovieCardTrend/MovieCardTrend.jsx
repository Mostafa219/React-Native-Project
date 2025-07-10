import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function MovieCardTrend() {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={require("../../../assets/MovieposterTrend.png")}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        
<TouchableOpacity style={styles.trailerButton}>
          <Text style={styles.trailerText}>Watch Trailer ▶</Text>
        </TouchableOpacity>
        
      </ImageBackground>
      <View
          style={styles.detailsContainer}
        >
          <Text style={styles.trending}>TRENDING</Text>

          <View style={styles.row}>
            <Text style={styles.title}>EVIL DEAD RISE</Text>
            <LinearGradient
              colors={["#323232", "#767676", "#363535"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bookButton}
            >
              <Text style={styles.bookText}>Book</Text>
            </LinearGradient>
          </View>

          <View style={styles.row}>
            <Text style={styles.language}>A. ENGLISH</Text>
            <Text style={styles.formats}>2D.3D.4DX</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.genre}>HORROR</Text>
          </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    width: 353
,
    height: 400,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    resizeMode: "cover",
        height: 350,
            borderRadius: 30,


  },
  trailerButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-end",
    margin: 10,
    position: "absolute",
    top: 200,
    right: 6,
    zIndex: 10,
  },
  trailerText: {
    color: "#fff",
    fontSize: 12,
  },
  detailsContainer: {
    width: 330,
    height: 150,
   position:"absolute",
    padding: 26,
    borderRadius:80,
    backgroundColor:"#1E1E1E",
    marginHorizontal:"auto",
    marginLeft:15,
    top:250,
    
  },
  trending: {
    color: "#FFF",
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  language: {
    color: "#fff",
    fontSize: 14,
  },
  genre: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  formats: {
    color: "#FFF",
    fontSize: 12,
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bookText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
