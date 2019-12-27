import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body } from 'native-base';
import { Icon } from "react-native-elements";
import ItemEquipos from '../components/ItemEquipos';


const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  },
  container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ebebeb'
	},
   header: {
		backgroundColor: '#E67E22'
	}
});
export default class ItemCategorias extends Component {
   
state = {
   listaEquip : [{id:'Prueba_2019',
             nombreEquipo:'Prueba_2019'}]
}
listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          id: child.key,
          nombreEquipo: child.nombreEquipo,
          imagenEquipo: child.imagenEquipo
        });
      });

      this.setState({
        listaEquip: lista
      });

    });
  }
	componentDidMount() {

      
	}
  render() {
    return (
      <View style={styles.itemsList}>
				{this.props.lista.map((item, index) => {
      console.log(this.props.rut)
     // const itemsRef = this.props.rut;
      // var RCat =itemsRef.child(item.id+'/equipos/');
      // console.log(RCat);
      //this.listenForItems(RCat);
      
					return (
						<View key={index} style={styles.container}>
							<Text style={styles.itemtext}>{item.id}</Text>
                      <ItemEquipos lista={this.state.listaEquip} />
						</View>
                );
				})}
		</View>   
    );
  }
}

