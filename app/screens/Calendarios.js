import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   Button,
   ActivityIndicator,
   Platform,
} from 'react-native';

import { Image, Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

//Importación componente de navegación
import NavegadorCategorias from '../components/NavegadorCategorias.js';

// Importación de constantes de color
import * as COLOR from '../constants/colors.js';
import StatusBarGeneral from '../components/StatusBarGeneral.js';
import * as CONSTANTES from '../constants/constantes.js';

// Importación componente de extración de firebase
import { loadTeams } from '../services/calendarioService.js';
import { Container, Content, Header } from 'native-base';

export default class Calendarios extends Component {
   constructor() {
      super();
      this.state = {
         listCalendarios: null,
         categoria: '',
      };
   }

   componentDidMount() {
      var listaCategorias = global.listaCategorias;
      var categ = listaCategorias[0];

      loadTeams(lista => {
         this.setState({ listCalendarios: lista });
      }, categ);
   }
   renderEditButton = (id, listaPartidos, listaFechas) => {
      let usuario = global.usuario;
      let torneoActual = global.idTorneo;
      let listaTorneos = global.listaTorneos;
      let permiso = this.buscarPermiso(listaTorneos, torneoActual);
      console.log('renderActionButton' + usuario);
      console.log('torneoActual' + torneoActual);
      if (usuario && permiso != -1) {
         return (
            <View style={styles.viewHeaderFechasBton}>
               <Icon
                  name="pencil"
                  type="material-community"
                  color={COLOR.COLOR_GRIS_CLARO}
                  size={20}
                  onPress={() => {
                     this.props.navigation.navigate('Partidos', {
                        partidos: listaPartidos,
                        fechas: listaFechas,
                        id: id,
                     });
                  }}
               />
            </View>
         );
      }
   };
   renderActionButton = listCalendarios => {
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
                  this.props.navigation.navigate('CrearFecha', {
                     id: listCalendarios.length,
                  });
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

   renderRowPartidos = listaPartidos => {
      const {
         equipoUno,
         equipoDos,
         fecha,
         hora,
         minuto,
         cancha,
      } = listaPartidos.item;
      return (
         <View style={styles.viewPartidos}>
            <View style={styles.viewEquipoUno}>
               <Image
                  resizeMode="cover"
                  source={{ cancha }}
                  style={[styles.imagenEstilo, border('#7A7A7A')]}
               />
               <Text style={styles.viewNombreEquipo}>{equipoUno}</Text>
            </View>
            <View style={[styles.viewDatos]}>
               <Text>{fecha}</Text>
               <Text>
                  {hora}:{minuto}
               </Text>
               <Text>cancha: {cancha}</Text>
            </View>
            <View style={styles.viewEquipoUno}>
               <Image
                  resizeMode="cover"
                  source={{ cancha }}
                  style={[styles.imagenEstilo, border('#7A7A7A')]}
               />
               <Text style={styles.viewNombreEquipo}>{equipoDos}</Text>
            </View>
         </View>
      );
   };

   renderRow = listCalendarios => {
      console.log('listCalendarios', listCalendarios);
      const {
         id,
         nombreItem,
         listaPartidos,
         listaFechas,
      } = listCalendarios.item;
      if (listaPartidos) {
         return (
            <View>
               <View style={styles.viewHeaderFechas}>
                  <Text style={styles.fechas}>{nombreItem}</Text>
                  {this.renderEditButton(id, listaPartidos, listaFechas)}
               </View>
               <FlatList
                  data={listaPartidos}
                  renderItem={this.renderRowPartidos}
                  keyExtractor={(item, index) => index.toString()}
               />
            </View>
         );
      } else {
         return (
            <View>
               <View style={styles.viewHeaderFechas}>
                  <Text style={styles.fechas}>{nombreItem}</Text>
                  <View style={styles.viewHeaderFechas}>
                     <Icon
                        name="playlist-plus"
                        type="material-community"
                        color={COLOR.COLOR_GRIS_CLARO}
                     />
                     <Icon
                        name="pencil"
                        type="material-community"
                        color={COLOR.COLOR_SECUNDARIO}
                        onPress={() => {
                           this.props.navigation.navigate('Partidos', {
                              partidos: listaPartidos,
                              fechas: listaFechas,
                              id: id,
                           });
                        }}
                     />
                  </View>
               </View>
            </View>
         );
      }
   };

   renderFlatList = listCalendarios => {
      if (listCalendarios) {
         return (
            <FlatList
               data={this.state.listCalendarios}
               renderItem={this.renderRow}
               keyExtractor={(item, index) => index.toString()}
            />
         );
      } else {
         return (
            <View style={styles.startLoadCalendarios}>
               <Text>Cargando Calendario </Text>
            </View>
         );
      }
   };

   render() {
      const { listCalendarios } = this.state;
      return (
         <Container style={styles.viewBody}>
            <Header style={styles.header}>
               <NavegadorCategorias
                  pintar={categ => {
                     loadTeams(lista => {
                        this.setState({ listCalendarios: lista });
                     }, categ);
                  }}
               />
            </Header>

            <Content>
               <View>{this.renderFlatList(listCalendarios)}</View>
            </Content>
            {this.renderActionButton(listCalendarios)}
            <StatusBarGeneral />
         </Container>
      );
   }
}

const border = color => {
   return { borderColor: color, borderWidth: 2, backgroundColor: color };
};

const styles = StyleSheet.create({
   viewBody: {
      flex: 1,
      backgroundColor: COLOR.COLOR_SNOWY_MOUNT,
   },
   startLoadCalendarios: { marginTop: 20, alignItems: 'center' },
   viewEquipoUno: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   viewNombreEquipo: { fontSize: 12 },
   viewPartidos: {
      flexDirection: 'row',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 2,
      padding: 5,
      backgroundColor: COLOR.COLOR_BLANCO,
      borderRadius: CONSTANTES.BORDER_RADIUS,
      height: 90,
   },
   fechas: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 5,
      marginLeft: 15,
   },
   imagenEstilo: { width: 60, height: 60, borderRadius: 67 },
   viewDatos: { flex: 2, justifyContent: 'center', alignItems: 'center' },
   header: {
      backgroundColor: COLOR.COLOR_SECUNDARIO,
      marginTop: 2,
   },
   viewHeaderFechas: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginRight: 15,
      height: 50,
      alignItems: 'center',
   },
   viewHeaderFechasBton: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
   },
});
