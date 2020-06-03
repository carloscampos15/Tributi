import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Icon, CardItem, Card } from "native-base";
import { AuthContext } from "./../context/AuthContext";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";

export default function SettingScreen() {
  const { signOut } = React.useContext(AuthContext);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const _retrieveData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        setUser(JSON.parse(user));
      } catch (error) {
        console.log("local storage: " + error);
      }
    };
    _retrieveData();
  }, []);

  if (user == null) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./../assets/icon.png")} />
      <Text style={styles.textContainer}>
        {user.name + " " + user.lastname}
      </Text>
      <View style={styles.panelContent}>
        <Card>
          <CardItem button onPress={signOut}>
            <Icon type="SimpleLineIcons" name="logout" style={styles.icon} />
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
    fontSize: 20,
  },
});
