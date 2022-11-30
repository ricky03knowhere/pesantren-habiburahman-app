import React from "react";
import { AsyncStorage } from "react-native";

const Logout = ({navigation}) => {
  AsyncStorage.clear();
  navigation.replace('Login')
};

export default Logout;
