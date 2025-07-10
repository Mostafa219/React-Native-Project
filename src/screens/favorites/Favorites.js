import { useState, useEffect } from "react";
import FilmCard from "../../components/FilmCard/Filmcard";
import { getFavorites, deleteFavorite } from "../../lib/favorites/utilitys";
import { FlatList, StatusBar, View } from "react-native";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavorites(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

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
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={{ backgroundColor: "#121011", flex: 1 }}>
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmCard movie={item} onDeleteFavorite={handleDeleteFavorite} />
          )}
        />
      </View>
    </>
  );
}
