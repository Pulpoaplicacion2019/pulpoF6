import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView,TextInput } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Left, Right, Body } from 'native-base';
import { Icon, Input, Avatar, Button } from "react-native-elements";
import {loadTeams} from '../../services/equipos.js';


const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  }
});

export default class CrearEquipos extends Component {

state = {
   listaCat : [],
   index:0,
   categoria:'',
   listaEquip: []
}
save = () => {
       var indice = this.state.index;
       
  
       
     }
     
	componentDidMount() {
       var lista = global.listaCategorias;
     this.setState({
        listaCat: lista
      });
	}
  render() {
    return (
      
      <View style={styles.viewBody}>
          <Avatar medium rounded
           icon={{name: 'dribbble', type: 'font-awesome'}}
           onPress={() => console.log("Works!")}
         />
         <Button          
           icon={{name: 'insert-photo'}}
           title='Cargar' />
         <Input
           placeholder='Nombre Equipo'
           leftIcon={{ type: 'font-awesome', name: 'dribbble' }}
         />
         <Input
           placeholder='Nombre Representante'
           leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
         />

          <Input
            placeholder="Apellido Representante"
            leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
            onChangeText={value => this.setState({ apellido: value })}
           />
         <Input
            placeholder="Correo"
            leftIcon={{ type: 'font-awesome', name: 'inbox' }}
            onChangeText={value => this.setState({ mail: value })}
           />
         <Input
            placeholder="Teléfono"
            leftIcon={{ type: 'font-awesome', name: 'phone' }}
            onChangeText={value => this.setState({ phone: value })}
           />
           <Button
           large
           icon={{name: 'cached'}}
           title='Guardar' 
           onPress={this.save}/>
    </View>       
    );
  }
}

