import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Auth, QrCode, Splash } from "../pages";
import BottomNavigation from "../components/BottomNavigation";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../components/Logout";
import ConnectedDevice from "../pages/ConnectedDevice";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const handleConfirm = () =>
    Alert.alert("Are your sure?", "To logout from this app", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          Logout();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);

  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="QRCode Scanner"
        component={QrCode}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        onClick={handleConfirm}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConnectedDevice"
        component={ConnectedDevice}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
const styles = StyleSheet.create({});
