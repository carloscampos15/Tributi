import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AsyncStorage } from "react-native";
import { Icon } from "native-base";

import { AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import MapScreen from "./screens/MapScreen";

const AuthStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      options={{ headerShown: false }}
      component={LoginScreen}
    />
  </AuthStack.Navigator>
);

const TabsScreen = () => (
  <Tab.Navigator
    barStyle={{ backgroundColor: "white" }}
    labelStyle={{ fontSize: 12 }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "settings" : "settings-outline";
        } else if(route.name === "Map") {
          iconName = focused ? "map-marker" : "map-marker-outline";
        }
        return (
          <Icon
            type="MaterialCommunityIcons"
            name={iconName}
            style={{ color: "#3B3E40", fontSize: 24 }}
          />
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Settings" component={SettingScreen} />
  </Tab.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={TabsScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  var _retrieveData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userToken = await AsyncStorage.getItem("userToken");
      if (user !== null) {
        setUser(JSON.parse(user));
        setUserToken(JSON.parse(userToken));
      }
    } catch (error) {
      console.log("local storage: " + error);
    }
  };

  React.useEffect(() => {
    const validateSession = async () => {
      _retrieveData();
    };

    const loadFonts = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });
      setIsReady(true);
    };

    loadFonts();
    validateSession();
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        _retrieveData();
      },
      signOut: () => {
        setUserToken(null);
      },
    };
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
