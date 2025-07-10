import { useState, useCallback } from "react";
import FilmCard from "../../components/FilmCard/Filmcard";
import { getFavorites, deleteFavorite } from "../../lib/favorites/utilitys";
import { FlatList, StatusBar, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const favorites = await getFavorites();
          setFavorites(favorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };

      fetchFavorites();
    }, [])
  );

  async function handleDeleteFavorite(id) {
    try {
      await deleteFavorite(id);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== id)
      );
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121011" }}>
      <StatusBar barStyle="light-content" backgroundColor="#121011" />
      <View style={{ flex: 1 }}>
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmCard
              id={item.id}
              title={item.title}
              rating={item.rating}
              poster={item.poster}
              onDeleteFavorite={handleDeleteFavorite}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
