import { Link } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR } from "../utils/const";

export default function QrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the qr code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  // Check permission and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access camera</Text>
        <Button title="Allow Camera" onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <Text style={styles.header}>QRCode Scanner</Text>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 600, width: 600 }}
        />
      </View>
      <Text style={styles.mainText}> {text}</Text>
      {scanned && (
        <Button
          title="Scan again?"
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
      <StatusBar style="auto" />

      <Link to='/ConnectedDevice' style={{color: PRIMARY_COLOR}}> &raquo; Connected Device</Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  barcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },

  header: {
    fontSize: 24,
    fontWeigth: 600,
    marginVertical: 24,
    textAlign: "center",
  },
});
