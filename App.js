import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import CustomSplash from "./src/screens/splash/splash";
import Home from "./src/screens/home/Home";
import FilmCard from "./src/components/FilmCard/Filmcard";
import MovieCardTrend from "./src/components/MovieCardTrend/MovieCardTrend";
import MovieDetails from "./src/screens/MovieDetails/MovieDetails";
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#121011', justifyContent: 'center', alignItems: 'center' }}>
      <Home/>
    </View>
  );
}
function SearchScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#121011', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>Home Screen</Text>
    </View>
  );
}

function FavouriteScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121011",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff" }}>Favourite Screen</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#EB2F3D',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#1E1E1E' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Favourite') iconName = 'heart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setAppIsReady(true), 100);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={CustomSplash} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}