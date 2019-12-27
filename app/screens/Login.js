import React, { Component } from "react";
import { Platform,StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import {DrawerActions}from "react-navigation-drawer"

export default class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Login",
        headerLeft: Platform.select({
          ios: (
            <Icon
              name="ios-log-out"
              type="ionicon"
              containerStyle={styles.icon}
              onPress={() => navigation.navigate("MisTorneosScreen")}
            />
          ),
          android: (
            <Icon
              name="md-menu"
              type="ionicon"
              containerStyle={styles.icon}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )
        })
      });
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>LoginScreen ...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
