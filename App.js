import React from "react";
import MisTorneosScreen from "./app/navigations/Home"; // Importar la página creada de prueba
import {
   SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MisTorneosScreen />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    margin: 20
  },
  multiButtonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
