import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import { decode, sign } from "react-native-pure-jwt";
import jwtDecode from "jwt-decode";

export default function Home() {
  const [user, setUser] = useState({});

  // const test = sign(
  //     {
  //       iss: "luisfelipez@live.com",
  //       exp: new Date().getTime() + 3600 * 1000, // expiration date, required, in ms, absolute to 1/1/1970
  //       additional: "payload",
  //     }, // body
  //     "my-secret", // secret
  //     {
  //       alg: "HS256",
  //     }
  //   )
  //   .then((jwt) => console.log("jwt ==>> ", jwt)) // token as the only argument
  //   .catch(console.error);

  // test();
  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user").then((data) => data);
      // console.log("user ==>>", JSON.stringify(user));
      if (user) {
        const getUser = jwtDecode(user);
        console.log("getUser ==>", getUser);
        setUser(getUser);
      }
    })();
  }, []);

  console.log("user ==>> ", user);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Page</Text>
      <Text style={{ fontSize: 16, fontWeigth: 600 }}>
        Wellcome, {user.name}
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
});
