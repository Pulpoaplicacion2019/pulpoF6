import React, { Component } from "react";
import { Platform,StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

export default class Resultados extends Component {

  static navigationOptions = {
    tabBarLabel: "Resultados",
    tabBarIcon: ({ tintColor }) => {
      let iconName = Platform.select({ ios: "ios-trophy", android: "md-trophy" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    }
  };
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Página para mostrar el calendario.</Text>
      </View>
    );
  }
}

// Estilos para el view que se esta pintando en la pantalla
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
