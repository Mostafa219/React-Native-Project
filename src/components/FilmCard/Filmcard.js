import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function FilmCard() {
  return (
    <View style={styles.filmcard}>
      <ImageBackground
        source={require('../../../assets/filmposter.png')}
        style={styles.filmposter}
        imageStyle={styles.imageStyle}>
        <TouchableOpacity style={styles.favIconContainer}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Salaar (part 1)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filmcard: {
    marginVertical: 90,
  },
  filmposter: {
    width: 162,
    height: 216,
    borderRadius: 39,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  favIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#1E1E1E',
    padding: 8,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 10,
    marginLeft: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
});
