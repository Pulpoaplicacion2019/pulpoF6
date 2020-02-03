import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { cargarEquipos } from '../../services/equipos.js';
import ItemEquipos from '../../components/ItemEquipos';
import NavegadorCategorias from '../../components/NavegadorCategorias.js';
import * as COLOR from '../../constants/colors.js';
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
      backgroundColor: COLOR.COLOR_SECUNDARIO,
      marginTop: 2,
   },
});
export default class Equipos extends Component {
   constructor(props) {
      super(props);
      var lista = global.listaCategorias;
      var categ = lista[0];
      this.state = {
         listaCat: lista,
         categoria: categ,
         listaEquip: [],
      };

      cargarEquipos(categ, listaEquipos => {
         this.setState({ listaEquip: listaEquipos });
      });
   }
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

   componentDidMount() {}
   renderActionButton = () => {
      let usuario = global.usuario;
      let torneoActual = global.idTorneo;
      let listaTorneos = global.listaTorneos;
      if (listaTorneos) {
         let permiso = this.buscarPermiso(listaTorneos, torneoActual);
         console.log('renderActionButton' + usuario);
         console.log('torneoActual' + torneoActual);
         if (usuario && permiso != -1) {
            return (
               <ActionButton
                  buttonColor="#00A680"
                  onPress={() => {
                     this.props.navigation.navigate('CrearEquipos', {
                        categoria: this.state.categoria,
                        listaEquipos: this.state.listaEquip,
                        modo: 'C',
                     });
                  }}
               />
            );
         }
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
                        this.setState({ categoria: categ });
                     }}
                  />
               </Header>
               <Content>
                  <View style={styles.container}>
                     <ItemEquipos
                        lista={this.state.listaEquip}
                        nav={this.props.navigation}
                        categoria={this.state.categoria}
                     />
                  </View>
               </Content>
            </Container>
            {this.renderActionButton()}
         </View>
      );
   }
}
