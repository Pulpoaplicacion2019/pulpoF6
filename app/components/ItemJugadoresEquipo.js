import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import * as COLOR from '../constants/colors.js';
//import styles from '../Styles/styles';

const styles = StyleSheet.create({
   row: {
      flex: 1,
   },
   container: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
   },
   inputContentEstilo: {
      fontSize: 15,
      padding: 5,
   },
});
export default class ItemJugadores extends Component {
   state = {
      lista: [],
   };
   editarJugador = () => {
      let equipo = this.props.equipo;
      let ruta = 'CrearJugadores';
      this.props.nav.navigate(ruta, { equipo: equipo });
   };
   eliminarJugador = () => {};
   render() {
      return (
         <View style={styles.row}>
            <View style={styles.container}>
               <Text style={styles.inputContentEstilo}>
                  {this.props.jugador.cedula}
               </Text>
               <Text style={styles.inputContentEstilo}>
                  {this.props.jugador.primerNombre}
               </Text>
               <Text style={styles.inputContentEstilo}>
                  {this.props.jugador.primerApellido}
               </Text>
               <Text style={styles.inputContentEstilo}>
                  {this.props.jugador.numero}
               </Text>
               <Button
                  small
                  type="outline"
                  icon={{ name: 'edit' }}
                  onPress={() => {
                     this.editarjugador;
                  }}
               />
               <Button
                  small
                  type="outline"
                  icon={{ name: 'garbage' }}
                  onPress={() => {
                     this.eliminarjugador;
                  }}
               />
            </View>
         </View>
      );
   }
}
