import React, { Component } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
