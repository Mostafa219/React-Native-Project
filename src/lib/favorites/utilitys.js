import AsyncStorage from "@react-native-async-storage/async-storage";
// get all favorites
export async function getFavorites() {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error reading favorites from storage", error);
    return [];
  }
}

// add favorite

export async function addFavorite(favorite) {
  try {
    let favorites = await getFavorites();
    favorites = [...favorites, favorite];
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error adding favorite to storage", error);
  }
}

// delete favorite
export async function deleteFavorite(id) {
  try {
    let favorites = await getFavorites();
    favorites = favorites.filter((favorite) => favorite.id !== id);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error deleting favorite from storage", error);
  }
}

// check if favorite exists

export async function favoriteExists(id) {
  try {
    const favorites = await getFavorites();
    return favorites.some((favorite) => favorite.id === id);
  } catch (error) {
    console.error("Error checking if favorite exists in storage", error);
  }
}
