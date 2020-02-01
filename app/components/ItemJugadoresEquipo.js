import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { eliminarElementos } from './Alertas';
import { eliminarJugador } from '../services/jugadores';
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
      this.props.nav.navigate(ruta, {
         equipo: equipo,
         jugadorId: this.props.jugador.cedula,
      });
   };
   eliminarJugador = () => {
      let mensaje =
         '¿Está seguro que desea eliminar el jugador ' +
         this.props.jugador.primerNombre +
         ' ' +
         this.props.jugador.primerApellido +
         ' ?';
      let infoJugador = {
         categoria: this.props.equipo.categoria,
         equipo: this.props.equipo.id,
         cedula: this.props.jugador.cedula,
      };
      eliminarElementos(mensaje, () => {
         eliminarJugador(infoJugador);
      });
   };
   componentDidMount() {}
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
                     this.editarJugador();
                  }}
               />
               <Button
                  small
                  type="outline"
                  icon={{ name: 'delete' }}
                  onPress={() => {
                     this.eliminarJugador();
                  }}
               />
            </View>
         </View>
      );
   }
}
