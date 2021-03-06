import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   ScrollView,
   Alert,
} from 'react-native';
import ItemJugadoresPartido from '../components/ItemJugadoresPartido';
import { cargarPartidos, guardarEstadoJugador } from '../services/vocalia.js';
import { Button, Icon } from 'react-native-elements';

// importación de constantes de color
import * as COLOR from '../constants/colors.js';

export default class Partidos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         equipo1: '',
         equipo2: '',
         listaJugadores1: [],
         listaJugadores2: [],
         partido: '',
         puntosEqui1Q1: '',
         puntosEqui1Q2: '',
         puntosEqui1Q3: '',
         puntosEqui1Q4: '',
         puntosEqui1Total: '',
         puntosEqui2Q1: '',
         puntosEqui2Q2: '',
         puntosEqui2Q3: '',
         puntosEqui2Q4: '',
         puntosEqui2Total: '',
         puntosj: '',
         estadoQ: 'Q1',
         listaJ1Suplentes: [],
         listaJ1Titulares: [],
      };
   }
   static navigationOptions = {
      drawerLabel: 'Vocalia',
      drawerIcon: ({ tintColor }) => {
         let iconName = Platform.select({
            ios: 'ios-document',
            android: 'md-document',
         });
         return <Icon name={iconName} type="ionicon" color={tintColor} />;
      },
   };

   componentDidMount() {
      var categ = 'Masculino';
      var fecha = 'Fecha1';
      var partido = 'Cobis_Ballenita';
      cargarPartidos(categ, fecha, partido, partidoDatos => {
         this.setState({
            equipo1: partidoDatos.equipoUno,
            equipo2: partidoDatos.equipoDos,
            puntosEqui1Q1: partidoDatos.puntosEqui1Q1,
            puntosEqui1Q2: partidoDatos.puntosEqui1Q2,
            puntosEqui1Q3: partidoDatos.puntosEqui1Q3,
            puntosEqui1Q4: partidoDatos.puntosEqui1Q4,
            puntosEqui1Total: partidoDatos.puntosEqui1Total,
            puntosEqui2Q1: partidoDatos.puntosEqui2Q1,
            puntosEqui2Q2: partidoDatos.puntosEqui2Q2,
            puntosEqui2Q3: partidoDatos.puntosEqui2Q3,
            puntosEqui2Q4: partidoDatos.puntosEqui2Q4,
            puntosEqui2Total: partidoDatos.puntosEqui2Total,
            listaJugadores1: this.convertirJugadoresLista(
               partidoDatos.listaJugadores1
            ),

            listaJugadores2: this.convertirJugadoresLista(
               partidoDatos.listaJugadores2
            ),
         });
      });
   }

   convertirJugadoresLista = jugadores => {
      let listaJugadores = [];

      if (jugadores) {
         Object.keys(jugadores).forEach(item => {
            console.log('itemconver ' + item);
            listaJugadores.push(jugadores[item]);
         });
      }

      return listaJugadores;
   };
   guardarEstadoJ1 = (numero, estado) => {
      let jugadores = 'jugadores1';
      let ref = 'num' + numero;
      guardarEstadoJugador(estado, jugadores, ref);
   };
   guardarEstadoJ2 = (numero, estado) => {
      let jugadores = 'jugadores2';
      let ref = 'num' + numero;
      guardarEstadoJugador(estado, jugadores, ref);
   };
   render() {
      return (
         <ScrollView>
            <View>
               <View style={styles.container}>
                  <View style={[styles.vocalia, { marginTop: 15 }]}>
                     <Text style={[styles.txt, { flex: 2 }]}>
                        {this.state.equipo1}
                     </Text>
                     <FlatList
                        data={this.state.listaJugadores1}
                        renderItem={({ item }) => (
                           <ItemJugadoresPartido
                              jugador={item}
                              estadoJugador={this.guardarEstadoJ1}
                           />
                        )}
                        keyExtractor={item => item.nombre}
                     />
                  </View>
                  <View style={[styles.vocalia, { marginTop: 15 }]}>
                     <Text style={[styles.txt, { flex: 2 }]}>
                        {this.state.equipo2}
                     </Text>
                     <FlatList
                        data={this.state.listaJugadores2}
                        renderItem={({ item }) => (
                           <ItemJugadoresPartido
                              jugador={item}
                              estadoJugador={this.guardarEstadoJ2}
                           />
                        )}
                        keyExtractor={item => item.nombre}
                     />
                  </View>
               </View>
               <View style={{ padding: 25 }}>
                  <Button
                     large
                     title="Iniciar Partido"
                     onPress={() => {
                        this.props.navigation.navigate('Vocalia');
                     }}
                  />
               </View>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
   },
   vocalia: {
      flex: 1,
      margin: 1,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      padding: 5,
      marginLeft: 1,
   },
   button: {
      flex: 1,
      borderWidth: 1,
      marginRight: 30,
   },
   txt: { fontSize: 20, padding: 5 },
});
