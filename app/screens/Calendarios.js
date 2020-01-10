import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   Button,
   ActivityIndicator,
} from 'react-native';

import { Image } from 'react-native-elements';
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

const NOMBRE_CLASE = 'Calendarios';

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
      console.log(
         NOMBRE_CLASE + '>> Lista global de categorias:' + listaCategorias
      );
      loadTeams(lista => {
         this.setState({ listCalendarios: lista });
      }, categ);
   }

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
      const { id, listaPartidos, listaFechas } = listCalendarios.item;
      if (listaPartidos) {
         return (
            <View>
               <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                  <Text style={styles.fechas}>{id}</Text>
                  <Button
                     title="E"
                     onPress={() => {
                        this.props.navigation.navigate('Partidos', {
                           partidos: listaPartidos,
                           fechas: listaFechas,
                           id: id,
                        });
                     }}
                  ></Button>
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
               <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                  <Text style={styles.fechas}>{id}</Text>
                  <Button
                     title="E"
                     onPress={() => {
                        this.props.navigation.navigate('Partidos', {
                           partidos: listaPartidos,
                           fechas: listaFechas,
                           id: id,
                        });
                     }}
                  ></Button>
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
            <ActionButton
               buttonColor="#00A680"
               onPress={() => {
                  this.props.navigation.navigate('CrearFecha', {
                     id: listCalendarios.length,
                  });
               }}
            />
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
});
