import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   ScrollView,
   Button,
   Alert,
} from 'react-native';
import ItemJugadoresVocalia from '../components/ItemJugadoresVocalia';
import {
   cargarPartidos,
   guardarPuntos,
   guardarPuntosJugador,
   guardarPuntosTotal,
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
   sumarP1 = (num, numeroJugador, puntosQ1, puntosQ2, puntosQ3, puntosQ4) => {
      const estadoQ = this.state.estadoQ;
      let puntos = '';
      let puntosJ = '';

      if (estadoQ == 'Q1') {
         this.setState({
            puntosEqui1Q1: parseInt(this.state.puntosEqui1Q1, 10) + num,
         });
         puntos = parseInt(this.state.puntosEqui1Q1, 10) + num;
         puntosJ = parseInt(puntosQ1, 10) + num;
      } else if (estadoQ == 'Q2') {
         this.setState({
            puntosEqui1Q2: parseInt(this.state.puntosEqui1Q2, 10) + num,
         });
         puntos = parseInt(this.state.puntosEqui1Q2, 10) + num;
         puntosJ = parseInt(puntosQ2, 10) + num;
      } else if (estadoQ == 'Q3') {
         puntos = parseInt(this.state.puntosEqui1Q3, 10) + num;
         puntosJ = parseInt(puntosQ3, 10) + num;
         this.setState({
            puntosEqui1Q3: parseInt(this.state.puntosEqui1Q3, 10) + num,
         });
      } else if (estadoQ == 'Q4') {
         this.setState({
            puntosEqui1Q4: parseInt(this.state.puntosEqui1Q4, 10) + num,
         });
         puntos = parseInt(this.state.puntosEqui1Q4, 10) + num;
         puntosJ = parseInt(puntosQ4, 10) + num;
      } else {
         console.log('sin estadoQ');
      }
      const equiTotal = 'puntosEqui1Total';
      const equi = 'puntosEqui1' + estadoQ;

      const jugadores = 'jugadores1';
      const ref = 'num' + numeroJugador;
      const equiJu = 'puntos' + estadoQ;
      let puntosTotal = parseInt(this.state.puntosEqui1Total, 10) + num;

      console.log('puntos total ', puntosTotal);

      guardarPuntos(equi, puntos);
      guardarPuntosTotal(equiTotal, puntosTotal);
      guardarPuntosJugador(puntosJ, jugadores, ref, equiJu);
   };
   sumarP2 = (num, numeroJugador, puntosQ1, puntosQ2, puntosQ3, puntosQ4) => {
      const estadoQ = this.state.estadoQ;
      let puntos = '';
      let puntosJ = '';

      if (estadoQ == 'Q1') {
         this.setState({
            puntosEqui2Q1: parseInt(this.state.puntosEqui2Q1, 10) + num,
         });
         puntos = parseInt(this.state.puntosEqui2Q1, 10) + num;
         puntosJ = parseInt(puntosQ1, 10) + num;
      } else if (estadoQ == 'Q2') {
         this.setState({
            puntosEqui2Q2: parseInt(this.state.puntosEqui2Q2, 10) + num,
         });
         puntos = parseInt(this.state.puntosEqui2Q2, 10) + num;
         puntosJ = parseInt(puntosQ2, 10) + num;
      } else if (estadoQ == 'Q3') {
         puntos = parseInt(this.state.puntosEqui2Q3, 10) + num;
         puntosJ = parseInt(puntosQ3, 10) + num;
         this.setState({
            puntosEqui2Q3: parseInt(this.state.puntosEqui2Q3, 10) + num,
         });
      } else if (estadoQ == 'Q4') {
         this.setState({
            puntosEqui2Q4: parseInt(this.state.puntosEqui2Q4, 10) + num,
         });
         puntos = parseInt(this.state.puntosEqui2Q4, 10) + num;
         puntosJ = parseInt(puntosQ4, 10) + num;
      } else {
         console.log('sin estadoQ');
      }
      const equiTotal = 'puntosEqui2Total';
      const equi = 'puntosEqui2' + estadoQ;

      const jugadores = 'jugadores2';
      const ref = 'num' + numeroJugador;
      const equiJu = 'puntos' + estadoQ;
      let puntosTotal = parseInt(this.state.puntosEqui2Total, 10) + num;

      console.log('puntos total ', puntosTotal);

      guardarPuntos(equi, puntos);
      guardarPuntosTotal(equiTotal, puntosTotal);
      guardarPuntosJugador(puntosJ, jugadores, ref, equiJu);
   };

   render() {
      return (
         <ScrollView>
            <View style={styles.container}>
               <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row' }}>
                     <View>
                        <Text style={{ fontSize: 30, marginLeft: 10 }}>
                           {this.state.estadoQ}
                        </Text>
                     </View>
                     <Button
                        style={styles.button}
                        title="Fin"
                        onPress={() => {
                           Alert.alert(
                              'Confirmación',
                              'Terminar tiempo ' + this.state.estadoQ,
                              [
                                 {
                                    text: 'Cancelar',
                                    onPress: () =>
                                       console.log('Cancel Pressed'),
                                    style: 'cancel',
                                 },
                                 {
                                    text: 'Aceptar',
                                    onPress: () => {
                                       if (this.state.estadoQ == 'Q1') {
                                          this.setState({ estadoQ: 'Q2' });
                                       } else if (this.state.estadoQ == 'Q2') {
                                          this.setState({ estadoQ: 'Q3' });
                                       } else if (this.state.estadoQ == 'Q3') {
                                          this.setState({ estadoQ: 'Q4' });
                                       }
                                    },
                                 },
                              ],
                              { cancelable: false }
                           );
                        }}
                     ></Button>
                  </View>
               </View>

               <View style={{ flexDirection: 'row' }}>
                  <View style={styles.vocalia}>
                     <View style={styles.container}>
                        <Text style={styles.txt}>{this.state.equipo1}</Text>
                        <Text style={styles.txt}>
                           {this.state.puntosEqui1Total}
                        </Text>
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
                        <Text style={styles.txt}>
                           {this.state.puntosEqui2Total}
                        </Text>
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
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
   vocalia: {
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
