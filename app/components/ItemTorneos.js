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
import { Image } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import styles from '../Styles/styles';
import { COLOR_GRIS_CLARO, COLOR_CHRISTMAS_RED } from '../constants/colors';
export default class Example extends Component {
   state = {
      colorFavorito: COLOR_GRIS_CLARO,
   };

   addFavorito = torneo => {
      if (torneo.favorito) {
         global.itemsRef.child(torneo.id).update({ favorito: false });
         this.setState({ colorFavorito: COLOR_GRIS_CLARO });
      } else {
         global.itemsRef.child(torneo.id).update({ favorito: true });
         this.setState({ colorFavorito: COLOR_CHRISTMAS_RED });
      }
   };

   imagePressed(item) {
      global.idTorneo = item.id;

      console.log('torneo elegido ', item);
      /*let ruta = 'TabEquipos';
      if (item.estado === 'A') {
         ruta = 'PerfilTorneo';
      } else {
         global.listaCategorias = Object.getOwnPropertyNames(item.categorias);
      }*/
      if (item.categorias != null) {
         global.listaCategorias = Object.getOwnPropertyNames(item.categorias);
      }
      this.props.nav.navigate('TabEquipos', {
         nombreTorneo: item.nombreTorneo,
      });
   }

   pintarFavorito = favorito => {
      if (favorito) {
         return COLOR_CHRISTMAS_RED;
      } else {
         return COLOR_GRIS_CLARO;
      }
   };

   render() {
      return (
         <FlatGrid
            itemDimension={130}
            items={this.props.torneos}
            style={[styles.gridView]}
            spacing={20}
            renderItem={({ item, index }) => (
               <View style={styles.container}>
                  <View style={styles.containerItemGrid}>
                     <View>
                        <Text style={styles.itemName}>{item.nombreTorneo}</Text>
                     </View>
                     <TouchableOpacity
                        style={styles.image}
                        onPress={() => this.imagePressed(item)}
                     >
                        <Image
                           style={styles.image}
                           source={{ uri: item.imagenTorneo }}
                        />
                     </TouchableOpacity>
                  </View>
                  <View style={styles.containerItemColumGrid}>
                     <Text style={styles.itemYear}>{item.anio}</Text>

                     <IconButton
                        icon="star"
                        color={this.pintarFavorito(item.favorito)}
                        size={25}
                        onPress={() => this.addFavorito(item)}
                     />
                  </View>
               </View>
            )}
         />
      );
   }
}
