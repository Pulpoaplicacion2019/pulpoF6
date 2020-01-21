import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class ItemJugadoresVocalia extends Component {
   render() {
      return (
         <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.txt}>{this.props.jugador.nombre}</Text>

            <Button
               style={styles.button}
               title="1"
               onPress={() => {
                  this.props.sumarPuntos(
                     1,
                     this.props.jugador.numero,
                     this.props.jugador.puntosQ1,
                     this.props.jugador.puntosQ2,
                     this.props.jugador.puntosQ3,
                     this.props.jugador.puntosQ4
                  );
               }}
            ></Button>
            <Button
               style={styles.button}
               title="2"
               onPress={() => {
                  this.props.sumarPuntos(
                     2,
                     this.props.jugador.numero,
                     this.props.jugador.puntosQ1,
                     this.props.jugador.puntosQ2,
                     this.props.jugador.puntosQ3,
                     this.props.jugador.puntosQ4
                  );
               }}
            ></Button>
            <Button
               style={styles.button}
               title="3"
               onPress={() => {
                  this.props.sumarPuntos(
                     3,
                     this.props.jugador.numero,
                     this.props.jugador.puntosQ1,
                     this.props.jugador.puntosQ2,
                     this.props.jugador.puntosQ3,
                     this.props.jugador.puntosQ4
                  );
               }}
            ></Button>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 20,
   },
   button: {
      borderWidth: 1,
      margin: 5,
   },
   txt: { fontSize: 15, padding: 5 },
});
