import React from "react";
import {
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  AsyncStorage,
} from "react-native";
import { PRIMARY_COLOR, DANGER_COLOR, DISABLED_COLOR } from "../utils/const";

import { useState, useEffect } from "react";
import { Link } from "@react-navigation/native";
import axios from "axios";

export default Login = ({ navigation }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleNavigate = async () => {
    const getToken = await AsyncStorage.getItem("user");
    console.log("getToken ==>>", getToken);
    // console.log("nav ==>>", navigation);
    if (getToken !== null) {
      navigation.replace("MainApp");
    }
  };

  useEffect(() => {
    handleNavigate();
  }, []);

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
      .post("http://192.168.43.185:4001/auth/login", user)
      .then((res) => {
        setLoading(false);
        // const user = AsyncStorage.getItem("user");
        console.log("token ==>>", res.data.token);
        try {
          AsyncStorage.setItem("user", res.data.token);
        } catch (error) {
          console.log(error);
        }
        showAlert("Successfuly Login");
        navigation.replace("MainApp");

        // return console.log("user ==>>", user);
      })
      .catch((err) => {
        // console.log("Error =>> ", err);
        // console.log(err.response);
        setLoading(false);
        showAlert(err.response.data);
      });
  };

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
};

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
