import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   ImageBackground,
   TouchableOpacity,
   Alert,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Image, Icon } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import styles from '../Styles/styles';
import { COLOR_GRIS_CLARO, COLOR_CHRISTMAS_RED } from '../constants/colors';
export default class ItemRanking extends Component {
   renderTorneosGanados = num => {
      if (num > 0) {
         for (var i = 0; i < num; i++) {
            return (
               <View>
                  <Icon
                     name="ios-trophy"
                     type="ionicon"
                     style={styles.button}
                  />
               </View>
            );
         }
      }
   };
   render() {
      return (
         <View
            style={{
               flexDirection: 'row',
               padding: 30,
               borderRadius: 4,
               borderWidth: 0.5,
               borderColor: '#d6d7da',
            }}
         >
            <View>
               <Image
                  style={{ width: 100, height: 120 }}
                  source={{
                     uri: this.props.datos.foto,
                  }}
               />
               <View style={{ flexDirection: 'row' }}>
                  {this.renderTorneosGanados(this.props.datos.torneosG)}
               </View>
            </View>
            <View style={{ marginLeft: 30 }}>
               <Text>Nombre: {this.props.datos.nombre}</Text>

               <Text>Puntos: {this.props.datos.puntos}</Text>
               <Text>Triples: {this.props.datos.triples}</Text>
               <Text> Partido: {this.props.datos.partidos}</Text>
               <Text>Mejor JUgador:</Text>
               <Text>Torneos Ganados: {this.props.datos.torneosG}</Text>
            </View>
         </View>
      );
   }
}
