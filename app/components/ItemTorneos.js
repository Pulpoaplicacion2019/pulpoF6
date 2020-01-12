import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   ImageBackground,
   TouchableOpacity,
   Alert,
} from 'react-native';
import { Image } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { IconButton } from 'react-native-paper';
import styles from '../Styles/styles';
export default class Example extends Component {
   state = {
      colorFavorito: '#ffffff',
   };

   addFavorito = torneo => {
      if (torneo.favorito) {
         global.itemsRef.child(torneo.id).update({ favorito: false });
         this.setState({ colorFavorito: '#ffffff' });
      } else {
         global.itemsRef.child(torneo.id).update({ favorito: true });
         this.setState({ colorFavorito: '#F79405' });
      }
   };

   imagePressed(item) {
      global.idTorneo = item.id;

      console.log('torneo elegido ', item);
      let ruta = 'TabEquipos';
      if (item.estado == 'A') {
         ruta = 'PerfilTorneo';
      } else {
         global.listaCategorias = Object.getOwnPropertyNames(item.categorias);
      }
      this.props.nav.navigate(ruta, { nombreTorneo: item.nombreTorneo });
   }

   pintarFavorito = favorito => {
      if (favorito) {
         return '#F79405';
      } else {
         return '#ffffff';
      }
   };

   render() {
      return (
         <FlatGrid
            itemDimension={150}
            fixed={true}
            items={this.props.torneos}
            style={styles.gridView}
            renderItem={({ item, index }) => (
               <View style={[styles.itemContainer, border('#7A7A7A')]}>
                  <TouchableOpacity
                     style={border('#0000')}
                     onPress={() => this.imagePressed(item)}
                  >
                     <ImageBackground
                        source={{ uri: item.imagenTorneo }}
                        style={styles.image}
                     >
                        <IconButton
                           icon="star"
                           color={this.pintarFavorito(item.favorito)}
                           size={25}
                           align="left"
                           onPress={() => this.addFavorito(item)}
                           style={styles.iconFav}
                        />
                     </ImageBackground>

                     <View style={border('#ffffff')}>
                        <Text style={styles.itemName}>{item.nombreTorneo}</Text>
                        <Text style={styles.itemYear}>{item.anio}</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            )}
         />
      );
   }
}

const border = color => {
   return { borderColor: color, borderWidth: 2 };
};
