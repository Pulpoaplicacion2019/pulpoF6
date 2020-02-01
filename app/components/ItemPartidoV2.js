import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import * as COLOR from '../constants/colors.js';

export default class ItemPartidoV2 extends Component {
   constructor(props) {
      super(props);
      this.state = {
         equipo2: '',
         equipo1: '',
         hora: '',
         minutos: '',
         fecha: '',
      };
   }

   render() {
      return (
         <View style={[border('#00D300'), styles.viewBody]}>
            <View style={[styles.time]}>
               <Text>
                  {this.props.partidos.hora}h{this.props.partidos.minuto + ' '}
               </Text>

               <Text>
                  {this.props.partidos.equipoUno} VS
                  {' ' + this.props.partidos.equipoDos}
               </Text>
               <View style={{ flexDirection: 'row', marginLeft: 100 }}>
                  <TouchableOpacity
                     style={{
                        borderWidth: 1,
                        width: 35,
                        height: 35,
                        marginLeft: 8,
                     }}
                     hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                     onPress={() => {
                        this.props.nav.navigate('EditarPartido', {
                           partidos: this.props.partidos,
                           fechas: this.props.fechas,
                           fechaId: this.props.fechaId,
                        });
                     }}
                  >
                     <Icon
                        name="check"
                        type="material-icons"
                        style={styles.button}
                     />
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={{
                        borderWidth: 1,
                        width: 35,
                        height: 35,
                        marginLeft: 20,
                     }}
                     hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                     onPress={() => {
                        this.props.eliminar(this.props.partidos.id);
                     }}
                  >
                     <Icon
                        name="delete"
                        type="material-icons"
                        style={styles.button}
                     />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}

const border = color => {
   return { borderColor: color, borderWidth: 2 };
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginRight: 20,
   },
   time: {
      flex: 1,
      flexDirection: 'row',
   },
   viewBody: {
      flex: 1,
      backgroundColor: COLOR.COLOR_BLANCO,
      flexDirection: 'column',
      marginLeft: 2,
      marginRight: 2,
      marginBottom: 10,
      borderRadius: 5,
      paddingHorizontal: 15,
   },
});
