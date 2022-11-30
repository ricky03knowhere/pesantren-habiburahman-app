import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";
import Logo2 from "../assets/logo2.png";
import { PRIMARY_COLOR } from "../utils/const";

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
  }, [navigation]);

  return (
    <ImageBackground style={styles.background}>
      <Image source={Logo2} style={styles.logo}></Image>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    height: "100%",
    width: "100%",
  },
  logo: {
    height: 150,
    width: 150,
  },
});
