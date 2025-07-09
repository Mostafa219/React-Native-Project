import { Text, View } from "react-native";
import React, { Component } from "react";
import FilmCard from "../../components/FilmCard/Filmcard";
import TrendMovie from "../../components/MovieCardTrend/MovieCardTrend.jsx";

export default class Home extends Component {
  render() {
    return (
      <View>
        <TrendMovie/>
        <FilmCard/>
      </View>
    );
  }
}
