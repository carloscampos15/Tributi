import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar
} from "react-native";
import { Form, Item, Input, Text, Button, Label, Spinner } from "native-base";
import axios from "axios";
import { AuthContext } from "./../context/AuthContext";
import { AsyncStorage } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailState, setEmailState] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const [isLoggin, setIsLoggin] = React.useState(false);
  const [buttonState, setButtonState] = React.useState(false);

  const { signIn } = React.useContext(AuthContext);

  var validateForm = () => {
    var band = true;
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (email == "") {
      band = false;
      setEmailState("Email field can not be empty");
    } else {
      if (emailRegex.test(email)) {
        setEmailState("");
      } else {
        band = false;
        setEmailState("Invalid email");
      }
    }
    if (password == "") {
      band = false;
      setPasswordState("Password field can not be empty");
    } else {
      setPasswordState("");
    }
    return band;
  };

  var _storeData = async (user, token) => {
    try {
      await AsyncStorage.setItem("user", user);
      await AsyncStorage.setItem("userToken", token);
    } catch (error) {
      console.log("local storage: " + error);
    }
  };

  var onSubmit = async () => {
    if (validateForm()) {
      Keyboard.dismiss();
      setIsLoggin(true);
      setButtonState(true);

      axios
        .post("http://192.168.100.92:3999/api/auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          setIsLoggin(false);
          setButtonState(false);
          _storeData(
            JSON.stringify(response.data.user),
            JSON.stringify(response.data.token)
          );
          signIn();
        })
        .catch(function (error) {
          console.log("axios: " + error);
          setEmailState("These credentials do not match our records.");
          setIsLoggin(false);
          setButtonState(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
        <StatusBar backgroundColor="#e0a627" barStyle="light-content" />
          <View style={styles.top}></View>

          <View style={styles.middle}>
            {Dimensions.get("window").height > 700 && (
              <Image
                style={styles.image}
                source={require("./../assets/icon.png")}
              />
            )}

            <View style={styles.formArea}>
              <Text style={[styles.textContainer, styles.signin]}>Tributi</Text>
              <Form>
                <Item style={styles.formItems} floatingLabel>
                  <Label>Email</Label>
                  <Input
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Item>
                <Text style={styles.errors}>{emailState}</Text>

                <Item style={styles.formItems} floatingLabel>
                  <Label>Password</Label>
                  <Input
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                  />
                </Item>
                <Text style={styles.errors}>{passwordState}</Text>

                <View style={styles.Button}>
                  <Button
                    block
                    warning
                    onPress={onSubmit}
                    disabled={buttonState}
                  >
                    {(!isLoggin && <Text>Iniciar Sesión</Text>) ||
                      (isLoggin && <Spinner color="white" />)}
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    marginBottom: 30,
    position: "relative",
    top: "16%",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  top: {
    position: "relative",
    backgroundColor: "#e0a627",
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 280,
  },
  middle: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
    paddingLeft: 26.3,
    paddingRight: 26.3,
  },
  textContainer: {
    color: "#FCFDFF",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    position: "relative",
    top: "15%",
    alignSelf: "center",
  },
  formArea: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    top: "15%",
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  signin: {
    top: 0,
    color: "#2D3057",
    marginTop: 15,
  },
  formItems: {
    marginTop: 15,
    marginRight: 15,
    borderBottomColor: "#2D3057",
  },
  Button: {
    paddingRight: 30.8,
    paddingTop: 30.8,
    paddingLeft: 30.8,
    borderRadius: 4,
  },
  errors: {
    margin: 0,
    color: "red",
    marginLeft: 15,
    fontSize: 13,
  },
});
