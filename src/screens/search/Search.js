import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { searchByQuery } from '../../api/themoviedbApi';
import { getFavorites, deleteFavorite } from "../../lib/favorites/utilitys";
import SearchCard from './../../components/SearchCard/SearchCard';

const languages = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'Arabic (EG)', value: 'ar-EG' },
  { label: 'French (FR)', value: 'fr-FR' },
  { label: 'Spanish (ES)', value: 'es-ES' },
  { label: 'German (DE)', value: 'de-DE' },
  { label: 'Japanese (JP)', value: 'ja-JP' },
];

export default function Search() {
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);

  const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => {
    const y = (2025 - i).toString();
    return { label: y, value: y };
  });

  const [yearOpen, setYearOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const [yearItems, setYearItems] = useState(years);
  const [languageItems, setLanguageItems] = useState(languages);

  useEffect(() => {
    if (yearOpen) {
      setLanguageOpen(false);
    } else if (languageOpen) {
      setYearOpen(false);
    }
  }, [yearOpen, languageOpen]);

  const fetchMovies = useCallback(
    async (reset = false) => {
      if (loading || !query.trim()) return;

      setLoading(true);
      try {
        const data = await searchByQuery({
          query,
          page: reset ? 1 : page,
          year: filtersApplied ? year : '',
          language: filtersApplied ? language : '',
        });

        if (reset) {
          setResults(data.results);
          setPage(2);
        } else {
          setResults((prev) => [...prev, ...data.results]);
          setPage((prev) => prev + 1);
        }

        setHasMore(data.page < data.total_pages);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    },
    [query, page, year, language, loading, filtersApplied]
  );

  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      fetchMovies(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

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


  const renderItem = ({ item }) => <SearchCard id={item.id} title={item.title} rating={item.vote_average} poster={item.poster_path} onDeleteFavorite={handleDeleteFavorite} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search any movies name here"
            placeholderTextColor="#939392"
            style={styles.input}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Search Results</Text>
        {!loading && results.length === 0 && query.trim() !== '' && (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Results</Text>

            <DropDownPicker
              open={languageOpen}
              value={language}
              items={languageItems}
              setOpen={setLanguageOpen}
              setValue={(callback) => setLanguage(callback(language))}
              setItems={setLanguageItems}
              placeholder="Select Language"
              style={styles.dropdown}
              textStyle={{ color: '#fff' }}
              dropDownContainerStyle={{ backgroundColor: '#1E1E1E' }}
            />

            <DropDownPicker
              open={yearOpen}
              value={year}
              items={yearItems}
              setOpen={setYearOpen}
              setValue={(callback) => setYear(callback(year))}
              setItems={setYearItems}
              placeholder="Select Year"
              style={styles.dropdown}
              textStyle={{ color: '#fff' }}
              dropDownContainerStyle={{ backgroundColor: '#1E1E1E' }}
            />

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setModalVisible(false);
                setFiltersApplied(true);
                setPage(1);
                fetchMovies(true);
              }}
            >
              <Text style={styles.filterButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={() => {
          if (hasMore && !loading) fetchMovies();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator color="#EB2F3D" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121011',
    padding: 10,
    paddingTop: 50,
  },
  backArrow: {
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: '#1E1E1E',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 50,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginRight: 10,
  },
  resultsHeader: {
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  resultsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noResultsText: {
    color: '#aaa',
    fontSize: 14,
  },
  flatListContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: '#121011',
    borderColor: '#333',
    marginBottom: 15,
    zIndex: 1000,
  },
  filterButton: {
    backgroundColor: '#EB2F3D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
