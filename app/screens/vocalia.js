import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import ItemJugadoresVocalia from '../components/ItemJugadoresVocalia';
import {
   cargarPartidos,
   guardarPuntos,
   guardarPuntosJugador,
} from '../services/vocalia.js';

export default class Partidos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         equipo1: '',
         equipo2: '',
         listaJugadores1: [],
         listaJugadores2: [],
         partido: '',
         puntosEqui1: '',
         puntosEqui2: '',
         puntosj: '',
      };
   }
   componentDidMount() {
      var categ = 'Masculino';
      var fecha = 'Fecha1';
      var partido = 'Cobis_Ballenita';
      cargarPartidos(categ, fecha, partido, partidoDatos => {
         this.setState({
            equipo1: partidoDatos.equipoUno,
            equipo2: partidoDatos.equipoDos,
            puntosEqui1: partidoDatos.puntos1,
            puntosEqui2: partidoDatos.puntos2,
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
   sumarP1 = (num, numeroJugador, puntosJugador) => {
      this.setState({
         puntosEqui1: parseInt(this.state.puntosEqui1, 10) + num,
      });

      const puntos = parseInt(this.state.puntosEqui1, 10) + num;
      const equi = 'puntosEquiUno';
      const puntosJ = parseInt(puntosJugador, 10) + num;
      const jugadores = 'jugadores1';
      const ref = 'num' + numeroJugador;
      guardarPuntos(equi, puntos);
      guardarPuntosJugador(puntosJ, jugadores, ref);
   };
   sumarP2 = (num, numeroJugador, puntosJugador) => {
      this.setState({
         puntosEqui2: parseInt(this.state.puntosEqui2, 10) + num,
      });
      const puntos = parseInt(this.state.puntosEqui2, 10) + num;

      const equi = 'puntosEquiDos';
      const puntosJ = parseInt(puntosJugador, 10) + num;
      const jugadores = 'jugadores2';
      const ref = 'num' + numeroJugador;
      guardarPuntos(equi, puntos);
      guardarPuntosJugador(puntosJ, jugadores, ref);
   };

   render() {
      return (
         <ScrollView>
            <View style={styles.container}>
               <View style={styles.vocalia}>
                  <View style={styles.container}>
                     <Text style={styles.txt}>{this.state.equipo1}</Text>
                     <Text style={styles.txt}>{this.state.puntosEqui1}</Text>
                  </View>
                  <FlatList
                     data={this.state.listaJugadores1}
                     renderItem={({ item }) => (
                        <ItemJugadoresVocalia
                           jugador={item}
                           sumarPuntos={this.sumarP1}
                        />
                     )}
                     keyExtractor={item => item}
                  />
               </View>
               <View style={styles.vocalia}>
                  <View style={styles.container}>
                     <Text style={styles.txt}>{this.state.equipo2}</Text>
                     <Text style={styles.txt}>{this.state.puntosEqui2}</Text>
                  </View>
                  <FlatList
                     data={this.state.listaJugadores2}
                     renderItem={({ item }) => (
                        <ItemJugadoresVocalia
                           jugador={item}
                           sumarPuntos={this.sumarP2}
                        />
                     )}
                     keyExtractor={item => item}
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
      margin: 20,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      padding: 5,
      marginLeft: 10,
   },
   button: {
      flex: 1,
      borderWidth: 1,
      marginRight: 30,
   },
   txt: { fontSize: 20, padding: 5 },
});
