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
import { Button } from 'react-native-elements';

// importación de constantes de color
import * as COLOR from '../constants/colors.js';

export default class PartidosMejorJugador extends Component {
   render() {
      return (
         <View>
            <Text>Pantalla para seleccionar el mejor jugador</Text>
         </View>
      );
   }
}
