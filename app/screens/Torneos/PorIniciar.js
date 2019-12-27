import React, { Component } from "react";
import { Platform,StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import ItemTorneos from '../../components/ItemTorneos';
import styles from "../../Styles/styles";

export default class PorIniciar extends Component {
  static navigationOptions = {
    tabBarLabel: "Por Iniciar",
    tabBarIcon: ({ tintColor }) => {
      let iconName = Platform.select({ ios: "ios-calendar", android: "md-calendar" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    }
  };

  state ={
    listaTorneos:[]
  };

  componentDidMount() {
    global.porIniciarComponent=this;
    cargarTorneo("I",porIniciarComponent,1);
  }
  
  componentWillUnmount() {
    global.porIniciarComponent=null;
  }
  
  render() {	  
    return (		
          <View style={[styles.container]} >
             <ItemTorneos torneos={this.state.listaTorneos} nav={this.props.navigation}/>
            </View>       
    );
  }
}
