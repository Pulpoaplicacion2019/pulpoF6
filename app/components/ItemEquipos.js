import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import styles from '../Styles/styles';

export default class ItemEquipos extends Component {
   state = {
      lista: [],
   };
   editarEquipo = item => {
      console.log('equipo elegido ', item);
      let categoriaActual = this.props.categoria;
      let equipo = { categoria: categoriaActual, id: item.id };
      let ruta = 'InfoEquipos';
      this.props.nav.navigate(ruta, { equipo: equipo });
   };
   render() {
      return (
         <View style={styles.containerE}>
            {this.props.lista.map((item, index) => {
               return (
                  <View style={styles.gridViewE}>
                     <View key={index} style={styles.containerItemGrid}>
                        <View>
                           <Text style={styles.itemName}>
                              {item.nombreEquipo}
                           </Text>
                        </View>
                        <TouchableOpacity
                           style={styles.image}
                           onPress={() => this.editarEquipo(item)}
                        >
                           <Image
                              source={{ uri: item.imagenEquipo }}
                              style={styles.image}
                           ></Image>
                        </TouchableOpacity>
                     </View>
                     <View style={styles.containerItemColumGrid}>
                        <Text style={styles.itemYear}>
                           {item.nombreRepresentante +
                              ' ' +
                              item.apellidoRepresentante}
                        </Text>
                     </View>
                  </View>
               );
            })}
         </View>
      );
   }
}
