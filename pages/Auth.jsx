import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import React, { useState, useEffect } from "react";
import { PRIMARY_COLOR, DANGER_COLOR, DISABLED_COLOR } from "../utils/const";
import axios from "axios";
import Home from "./Home";
import Register from "./Register";
import { Link } from "@react-navigation/native";

export default function Auth({ navigation }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   handleNavigate();
  // }, []);

  const handleNavigate = async () => {
    const getToken = await AsyncStorage.getItem("user");
    console.log("getToken ==>>", getToken);
    // console.log("nav ==>>", navigation);
    if (!getToken) {
      navigation.replace("Auth");
    } else {
      navigation.replace("Home");
    }
  };

  const showAlert = (alert) =>
    Alert.alert(
      "Warning!",
      alert,
      [
        {
          text: "Ok",
          // onPress: () => Alert.alert("Cancel Pressed"),
          style: "Ok",
        },
      ],
      {
        cancelable: true,
      }
    );

  const handleOnChange = (name) => {
    // console.log(name);
    // console.log(user);
    return (value) => {
      // console.log(value);
      setUser({ ...user, [name]: value });
    };
  };

  const handleOnSubmit = () => {
    // console.log(user);
    setLoading(true);
    axios
      .post("http://192.168.43.185:4001/auth/register", user)
      .then((res) => {
        setLoading(false);
        // const user = AsyncStorage.getItem("user");
        console.log("token ==>>", res.data.token);
        try {
          AsyncStorage.setItem("user", res.data.token);
        } catch (error) {
          console.log(error);
        }
        showAlert("Successfuly registered");
        // return console.log("user ==>>", user);
      })
      .catch((err) => {
        // console.log("Error =>> ", err);
        // console.log(err.response);
        setLoading(false);
        showAlert(err.response.data);
      });
  };

  let token = AsyncStorage.getItem("user")
    .then((data) => data)
    .catch((err) => console.log(err));
  console.log("Token ==>>", token);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Page</Text>
      <TextInput
        placeholder={"Email"}
        onChangeText={handleOnChange("email")}
        style={styles.input}
      />
      <TextInput
        placeholder={"Password"}
        onChangeText={handleOnChange("password")}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleOnSubmit}>
        <View style={{ backgroundColor: DANGER_COLOR, padding: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>
            {loading ? "Loading..." : "Login"}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.register}>
        Don't have any account,
        <Link to="/Register" style={{ color: PRIMARY_COLOR }}>
          {" "}
          register here
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    margin: 15,
  },
  header: {
    fontSize: 24,
    fontWeigth: 600,
    marginVertical: 24,
    textAlign: "center",
  },
  input: {
    heigth: 40,
    borderWidth: 1,
    borderColor: DISABLED_COLOR,
    padding: 10,
    marginVertical: 5,
  },
  register: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
});
