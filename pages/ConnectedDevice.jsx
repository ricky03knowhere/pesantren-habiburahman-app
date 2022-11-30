import React from "react";
import { View, Text, StyleSheet, ListItem, FlatList, Item } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/const";

export default ConnectedDevice = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(API_URL + "qr/activeDevice")
      .then(({ data }) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Connected Devices</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text>
            {item.deviceOS} {item.deviceVersion} : {item.deviceName}{" "}
            {item.deviceModel}
          </Text>
        )}
      />
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
});
