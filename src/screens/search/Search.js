import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { searchByQuery } from '../../api/themoviedbApi';


const genres = [
  { label: 'Action', value: '28' },
  { label: 'Comedy', value: '35' },
  { label: 'Drama', value: '18' },
  { label: 'Horror', value: '27' },
  { label: 'Romance', value: '10749' },
  { label: 'Documentary', value: '99' },
  { label: 'Animation', value: '16' },
  { label: 'Science Fiction', value: '878' },
  { label: 'Thriller', value: '53' },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');

  const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => {
    const y = (2025 - i).toString();
    return { label: y, value: y };
  });

  const ratings = Array.from({ length: 19 }, (_, i) => {
    const r = (1 + i * 0.5).toFixed(1);
    return { label: r, value: r };
  });

  const fetchMovies = useCallback(
    async (reset = false) => {
      if (loading || !query.trim()) return;

      setLoading(true);
      try {
        const data = await searchByQuery({
          query,
          page: reset ? 1 : page,
          year,
          rating,
          genre,
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
    [query, page, year, rating, genre, loading]
  );

  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      fetchMovies(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [query, year, rating, genre]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for a movie..."
          placeholderTextColor="#888"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Results</Text>

            <RNPickerSelect
              onValueChange={setGenre}
              items={genres}
              placeholder={{ label: 'Select Genre', value: '' }}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              onValueChange={setYear}
              items={years}
              placeholder={{ label: 'Select Year', value: '' }}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              onValueChange={setRating}
              items={ratings}
              placeholder={{ label: 'Select Min Rating', value: '' }}
              style={pickerSelectStyles}
            />

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setModalVisible(false);
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
        numColumns={2}
        contentContainerStyle={styles.list}
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
  },
  searchBar: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 45,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginRight: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    padding: 5,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
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

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: '#121011',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  inputAndroid: {
    backgroundColor: '#121011',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  placeholder: {
    color: '#aaa',
  },
};



