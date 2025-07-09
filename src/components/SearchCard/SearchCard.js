import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchCard({ item }) {
    const posterUrl = item?.poster_path
        ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
        : require('../../../assets/filmposter.png');

    return (
        <View style={styles.filmcard}>
            <ImageBackground
                source={posterUrl}
                style={styles.filmposter}
                imageStyle={styles.imageStyle}>

                <TouchableOpacity style={styles.favIconContainer}>
                    <Ionicons name="heart-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {item?.title?.toUpperCase() || 'NO TITLE'}
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    filmcard: {
    },
    filmposter: {
        width: 112,
        height: 149,
        borderRadius: 40,
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
        width: 100,
    },
});