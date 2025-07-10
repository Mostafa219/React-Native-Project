import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

const CustomSplash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function prepareApp() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await SplashScreen.hideAsync();
        navigation.replace('MainTabs');
      } catch (e) {
        console.warn(e);
        await SplashScreen.hideAsync();
        navigation.replace('MainTabs');
      }
    }

    prepareApp();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/splash-icon.png')}
        style={styles.splashImage}
        resizeMode="contain"
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EB2F3D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 120,
    height: 120,
  },
  loader: {
    position: 'absolute',
    bottom: 40,
  },
});

export default CustomSplash;