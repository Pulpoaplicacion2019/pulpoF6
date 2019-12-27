import React, { Component } from "react";
import {Platform, StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import ItemTorneos from '../../components/ItemTorneos';
import styles from "../../Styles/styles";

export default class Favoritos extends Component {
  static navigationOptions = {
    tabBarLabel: "Favoritos",
    tabBarIcon: ({ tintColor }) => {
      let iconName = Platform.select({ ios: "ios-star", android: "md-star" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    }
  };
  state ={
    listaTorneos:[]
  };

  componentDidMount() {
    global.favoritosComponent=this;
    cargarTorneo(true,favoritosComponent,2);
  }
  
  componentWillUnmount() {
    global.favoritosComponent=null;
  }
  render() {	  
    return (		
          <View style={[styles.container]} >
             <ItemTorneos torneos={this.state.listaTorneos} nav={this.props.navigation} />
            </View>       
    );
  }
}
