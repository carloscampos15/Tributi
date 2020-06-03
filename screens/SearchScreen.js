import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
} from "native-base";

export default function SearchScreen() {
  return (
    <Container style={{ backgroundColor: "#f2f2f2" }}>
      <Header
        style={{ backgroundColor: "#f2f2f2" }}
        noShadow={true}
        searchBar
        rounded
      >
        <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
        <Item>
          <Icon name="ios-search" style={{color: "#e0a627"}}/>
          <Input placeholder="Search" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <View style={styles.contentCards}>
        <Card style={styles.card}>
          <TouchableOpacity activeOpacity={0.5}>
            <CardItem cardBody>
              <ImageBackground
                source={require("./../assets/categories/food.png")}
                style={styles.image}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.textImage}>Alimentos</Text>
              </ImageBackground>
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity activeOpacity={0.5}>
            <CardItem cardBody>
              <ImageBackground
                source={require("./../assets/categories/tools.jpg")}
                style={styles.image}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.textImage}>Herramientas</Text>
              </ImageBackground>
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity activeOpacity={0.5}>
            <CardItem cardBody>
              <ImageBackground
                source={require("./../assets/categories/health.jpeg")}
                style={styles.image}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.textImage}>Salud</Text>
              </ImageBackground>
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity activeOpacity={0.5}>
            <CardItem cardBody>
              <ImageBackground
                source={require("./../assets/categories/pets.jpg")}
                style={styles.image}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.textImage}>Mascotas</Text>
              </ImageBackground>
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity activeOpacity={0.5}>
            <CardItem cardBody>
              <ImageBackground
                source={require("./../assets/categories/home.jpg")}
                style={styles.image}
                imageStyle={styles.imageStyle}
              >
                <Text style={styles.textImage}>Hogar</Text>
              </ImageBackground>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 30 : 0,
  },
  contentCards: {
    marginTop: 15,
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: { height: 120, width: null, flex: 1 },
  imageStyle: { opacity: 0.6, backgroundColor: "#000000" },
  textImage: {
    position: "absolute",
    bottom: 0,
    fontWeight: "bold",
    fontSize: 30,
    color: "#f2f2f2",
    marginLeft: 5,
  },
});
