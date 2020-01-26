import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   FlatList,
   Text,
   ScrollView,
   TextInput,
} from 'react-native';
import {
   Container,
   Header,
   Title,
   Content,
   Footer,
   FooterTab,
   Left,
   Right,
   Body,
} from 'native-base';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { cargarJugadores } from '../../services/jugadores';
import ItemJugadoresEquipo from '../../components/ItemJugadoresEquipo';

// importación archivo de colores
import * as COLOR from '../../constants/colors.js';

const styles = StyleSheet.create({
   viewContainer: {
      flex: 1,
      backgroundColor: COLOR.COLOR_SNOWY_MOUNT,
      padding: 20,
      //alignItems: 'center',
   },
   inputStilo: {
      padding: 2,
      marginTop: 20,
   },
   labelEstilo: {
      color: COLOR.COLOR_SECUNDARIO,
      fontWeight: 'bold',
      padding: 5,
   },
   inputContentEstilo: {
      backgroundColor: '#ffff',
      borderWidth: 1,
      borderColor: COLOR.COLOR_GRIS_CLARO,
      borderRadius: 8,
      paddingStart: 5,
   },
   header: {
      flexDirection: 'row',
   },
});
const border = color => {
   return { borderColor: color, borderWidth: 2 };
};

export default class CrudJugadores extends Component {
   state = {
      listaJugadores: [],
   };

   componentDidMount() {
      let equipo = this.props.navigation.getParam('equipo', null);
      this.setState({ equipo: equipo });

      cargarJugadores(equipo, listaJugadores => {
         this.setState({ listaJugadores: listaJugadores });
      });
   }

   render() {
      return (
         <View>
            <ScrollView>
               <View style={styles.viewContainer}>
                  <View style={styles.header}>
                     <Text style={styles.labelEstilo}>CÉDULA</Text>
                     <Text style={styles.labelEstilo}>NOMBRE</Text>
                     <Text style={styles.labelEstilo}>APELLIDO</Text>
                     <Text style={styles.labelEstilo}>NÚMERO</Text>
                  </View>
                  <FlatList
                     data={this.state.listaJugadores}
                     renderItem={({ item }) => (
                        <ItemJugadoresEquipo
                           nav={this.props.navigation}
                           jugador={item}
                           equipo={this.state.equipo}
                        />
                     )}
                     keyExtractor={item => item}
                  />
               </View>
            </ScrollView>
            <ActionButton
               buttonColor="#00A680"
               onPress={() => {
                  this.props.navigation.navigate('CrearJugadores', {
                     equipo: this.state.equipo,
                  });
               }}
            />
         </View>
      );
   }
}
