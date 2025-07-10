import { useState } from "react";
import FilmCard from "../../components/FilmCard/Filmcard";
import { getFavorites, deleteFavorite } from "../../lib/favorites/utilitys";
import { FlatList, StatusBar, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

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

  console.log("favorites", favorites);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#121011" />
      <View style={{ backgroundColor: "#121011", flex: 1, padding: 20, paddingVertical:50,paddingLeft:30}}>
        <FlatList 
        showsVerticalScrollIndicator={false}

          data={favorites}
          numColumns={2}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
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
    </>
  );
}
