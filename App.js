import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import Favorites from "./src/screens/favorites/Favorites";
import CustomSplash from "./src/screens/splash/splash";
import Home from "./src/screens/home/Home";
import MovieDetails from "./src/screens/MovieDetails/MovieDetails";
import Search from "./src/screens/search/Search";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Display names for the tabs
const tabDisplayNames = {
  Home: "Home",
  Search: "Search",
  Favourite: "Favorites",
};

const CustomTabButton = ({
  children,
  onPress,
  route,
  isActive,
  setActiveTab,
}) => {
  const handlePress = () => {
    setActiveTab(route.name);
    onPress(); // This is required to trigger navigation
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.buttonWrapper}
    >
      <View
        style={[
          styles.circle,
          isActive ? styles.activeCircle : styles.inactiveCircle,
        ]}
      >
        {children}
        {isActive && (
          <Text style={styles.tabLabel}>{tabDisplayNames[route.name]}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Home />
    </View>
  );
}

function MainTabs() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarButton: (props) => (
          <CustomTabButton
            {...props}
            route={route}
            isActive={activeTab === route.name}
            setActiveTab={setActiveTab}
          />
        ),
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Favourite") iconName = "heart";

          return (
            <Ionicons
              name={iconName}
              size={20}
              color="#fff"
              style={{ marginRight: focused ? 6 : 0 }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favourite" component={Favorites} />
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
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#121011",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    backgroundColor: "#1E1E1E",
    height: Platform.OS === "android" ? 80 : 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    paddingBottom: Platform.OS === "android" ? 10 : 25,
    paddingTop: 10,
    elevation: 10,
    borderTopWidth: 0,
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 50,
  },
  activeCircle: {
    backgroundColor: "#EB2F3D",
  },
  inactiveCircle: {
    backgroundColor: "#2A2A2A",
    width: 50,
    height: 50,
  },
  tabLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 4,
    textTransform: "capitalize",
  },
});
