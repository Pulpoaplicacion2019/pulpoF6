import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   TouchableHighlight,
} from 'react-native';
import styles from '../Styles/styles';

export default class ItemEquipos extends Component {
   /*static navigationOptions = {
      tabBarLabel: 'Equipos',
      tabBarIcon: ({ tintColor }) => {
         let iconName = Platform.select({
            ios: 'ios-basketball',
            android: 'md-basketball',
         });
         return <Icon name={iconName} type="ionicon" color={tintColor} />;
      },
   };*/

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
         <View>
            {this.props.lista.map((item, index) => {
               return (
                  <View key={index} style={styles.itemContainer}>
                     <TouchableHighlight
                        onPress={() => this.editarEquipo(item)}
                     >
                        <ImageBackground
                           source={{ uri: item.imagenEquipo }}
                           style={{ width: 100, height: 100 }}
                        >
                           <Text style={styles.itemName}>
                              {item.nombreEquipo}
                           </Text>
                        </ImageBackground>
                     </TouchableHighlight>
                  </View>
               );
            })}
         </View>
      );
   }
}
