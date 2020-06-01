import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Text,
  List,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  CardItem,
  Card,
  Right,
} from "native-base";
import { AuthContext } from "./../context/AuthContext";
import { AsyncStorage } from "react-native";

export default function SettingScreen() {
  const { signOut } = React.useContext(AuthContext);

  var _removeData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.log("local storage: " + error);
    }
  };

  var logout = () => {
    _removeData();
    signOut();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./../assets/icon.png")} />
      <Text style={styles.textContainer}>Carlos Campos</Text>
      <View style={styles.panelContent}>
        <Card>
          <CardItem button onPress={logout}>
            <Icon type="SimpleLineIcons" name="logout" style={styles.icon}/>
            <Text>Logout</Text>
          </CardItem>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    position: "relative",
    top: "12%",
    alignSelf: "center",
  },
  textContainer: {
    fontSize: 22,
    position: "relative",
    top: "14%",
    alignSelf: "center",
  },
  panelContent: {
    top: "16%",
  },
  icon: {
    fontSize: 20
  },
});
