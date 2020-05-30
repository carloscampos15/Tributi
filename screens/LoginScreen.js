import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Form, Item, Input, Text, Button, Label, Spinner } from "native-base";
import axios from "axios";
import * as Font from "expo-font";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailState: "",
      passwordState: "",
      isLoggin: false,
      buttonState: false,
    };
  }

  validateForm = () => {
    var band = true;
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (this.state.email == "") {
      band = false;
      this.setState({ emailState: "Email field can not be empty" });
    } else {
      if (emailRegex.test(this.state.email)) {
        this.setState({ emailState: "" });
      } else {
        band = false;
        this.setState({ emailState: "Invalid email" });
      }
    }
    if (this.state.password == "") {
      band = false;
      this.setState({ passwordState: "Password field can not be empty" });
    } else {
      this.setState({ passwordState: "" });
    }
    return band;
  };

  onSubmit = async () => {
    var that = this;
    if (that.validateForm()) {
      Keyboard.dismiss();
      that.setState({ isLoggin: true });
      that.setState({ buttonState: true });
      const { email, password } = that.state;

      axios
        .post("http://192.168.100.92:3999/api/auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          that.setState({ isLoggin: false });
          that.setState({ buttonState: false });
          console.log(response);
        })
        .catch(function (error) {
          that.setState({ emailState: "These credentials do not match our records." });
          that.setState({ isLoggin: false });
          that.setState({ buttonState: false });
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{flex: 1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.top}></View>

            <View style={styles.middle}>
              <Image
                style={styles.image}
                source={require("./../assets/icon.png")}
              />

              <View style={styles.formArea}>
                <Text style={[styles.textContainer, styles.signin]}>
                  Tributi
                </Text>
                <Form>
                  <Item style={styles.formItems} floatingLabel>
                    <Label>Email</Label>
                    <Input
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </Item>
                  <Text style={styles.errors}>{this.state.emailState}</Text>

                  <Item style={styles.formItems} floatingLabel>
                    <Label>Password</Label>
                    <Input
                      onChangeText={(password) => this.setState({ password })}
                      value={this.state.password}
                      secureTextEntry={true}
                    />
                  </Item>
                  <Text style={styles.errors}>{this.state.passwordState}</Text>

                  <View style={styles.Button}>
                    <Button
                      block
                      warning
                      onPress={this.onSubmit}
                      disabled={this.state.buttonState}
                    >
                      {(!this.state.isLoggin && <Text>Iniciar Sesión</Text>) ||
                        (this.state.isLoggin && <Spinner color="white" />)}
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
