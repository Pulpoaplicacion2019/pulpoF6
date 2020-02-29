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
      fontSize: 12,
      width: '18%',
   },
   buttonRigth: {
      width: '3%',
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
         listaJugadores: this.props.listaJugadores,
      });
   };
   eliminarJugador = () => {
      let mensaje =
         '¿Seguro que desea eliminar el jugador ' +
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
   renderEditAndDeleteButton = () => {
      if (this.props.visible) {
         return (
            <View style={styles.container}>
               <Button
                  style={styles.buttonRigth}
                  small
                  type="outline"
                  icon={{ name: 'edit' }}
                  onPress={() => {
                     this.editarJugador();
                  }}
               />
               <Button
                  style={styles.buttonRigth}
                  small
                  type="outline"
                  icon={{ name: 'delete' }}
                  onPress={() => {
                     this.eliminarJugador();
                  }}
               />
            </View>
         );
      }
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
               {this.renderEditAndDeleteButton()}
            </View>
         </View>
      );
   }
}
