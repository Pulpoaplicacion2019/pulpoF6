import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
   Container,
   Header,
   Title,
   Content,
   Footer,
   FooterTab,
   Button,
   Left,
   Right,
   Body,
} from 'native-base';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { cargarEquipos } from '../../services/equipos.js';
import ItemEquipos from '../../components/ItemEquipos';
import NavegadorCategorias from '../../components/NavegadorCategorias.js';

//importación barra de estado
import StatusBarGeneral from '../../components/StatusBarGeneral.js';

const styles = StyleSheet.create({
   viewBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ebebeb',
   },
   header: {
      backgroundColor: '#E67E22',
      justifyContent: 'center',
   },
});
export default class Equipos extends Component {
   static navigationOptions = {
      tabBarLabel: 'Equipos',
      tabBarIcon: ({ tintColor }) => {
         let iconName = Platform.select({
            ios: 'ios-basketball',
            android: 'md-basketball',
         });
         return <Icon name={iconName} type="ionicon" color={tintColor} />;
      },
   };
   state = {
      listaCat: [],
      index: 0,
      categoria: '',
      listaEquip: [],
   };

   componentDidMount() {
      var lista = global.listaCategorias;
      var categ = lista[0];
      this.setState({
         listaCat: lista,
         categoria: categ,
      });

      cargarEquipos(categ, listaEquipos => {
         this.setState({ listaEquip: listaEquipos });
      });
   }
   renderActionButton = () => {
      let usuario = global.usuario;
      let torneoActual = global.idTorneo;
      let listaTorneos = global.listaTorneos;
      let permiso = this.buscarPermiso(listaTorneos, torneoActual);
      console.log('renderActionButton' + usuario);
      console.log('torneoActual' + torneoActual);
      if (usuario && permiso != -1) {
         return (
            <ActionButton
               buttonColor="#00A680"
               onPress={() => {
                  this.props.navigation.navigate(
                     'CrearEquipos',
                     this.state.categoria
                  );
               }}
            />
         );
      }
   };
   buscarPermiso = (lista, id) => {
      let posicion = -1;
      let iteracion = 0;
      if (lista) {
         lista.forEach(element => {
            if (element == id) {
               posicion = iteracion;
            }
            iteracion++;
         });
      }
      return posicion;
   };

   render() {
      return (
         <View style={styles.container}>
            <Container>
               <Header style={styles.header}>
                  <NavegadorCategorias
                     pintar={categ => {
                        cargarEquipos(categ, listaEquipos => {
                           this.setState({ listaEquip: listaEquipos });
                        });
                     }}
                  ></NavegadorCategorias>
               </Header>
               <Content>
                  <View style={styles.container}>
                     <ItemEquipos lista={this.state.listaEquip} />
                  </View>
               </Content>
            </Container>
            {this.renderActionButton()}
            <StatusBarGeneral />
         </View>
      );
   }
}
