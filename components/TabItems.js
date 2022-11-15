import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DISABLED_COLOR, PRIMARY_COLOR } from "../utils/const";
// import {
//   IconHome,
//   IconHomeActive,
//   IconOrder,
//   IconOrderActive,
//   IconAccount,
//   IconAccountActive,
// } from "../../assets";

const TabItems = ({ isFocused, onPress, onLongPress, label }) => {
  // const Icon = () => {
  //   if (label === "Home") return isFocused ? <IconHomeActive /> : <IconHome />;
  //   if (label === "Auth")
  //     return isFocused ? <IconOrderActive /> : <IconOrder />;
  //   if (label === "QrCode")
  //     return isFocused ? <IconAccountActive /> : <IconAccount />;
  //   return <IconHome />;
  // };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      {/* <Icon size="12" /> */}
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    fontSize: 5,
  },
  text: (isFocused) => ({
    color: isFocused ? PRIMARY_COLOR : DISABLED_COLOR,
    fontSize: 14,
    marginTop: 8,
    // fontFamily: "TitilliumWeb-Regular",
  }),
});
