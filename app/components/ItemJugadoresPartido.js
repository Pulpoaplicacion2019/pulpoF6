import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Button,
   TouchableOpacity,
   Modal,
   TouchableHighlight,
   Alert,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { COLOR_CHRISTMAS_RED, COLOR_BLANCO } from '../constants/colors';
import ModalSuplentes from '../modales/VacaliaSuplentes.js';

export default class ItemJugadoresVocalia extends Component {
   state = {
      modalVisible: false,
      modalVisibleSuplente: false,
   };

   setModalVisible(visible) {
      this.setState({ modalVisible: visible });
   }
   setModalVisibleSuplentes(visible) {
      console.log('Visible:', visible);
      this.setState({ modalVisibleSuplente: visible });
      console.log(this.state.modalVisibleSuplente);
   }

   render() {
      return (
         <View style={{ flexDirection: 'row' }}>
            <View
               style={{
                  flex: 1,
                  alignContent: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
               }}
            >
               <View
                  style={{
                     flex: 4,
                     flexDirection: 'row',
                     alignItems: 'center',
                  }}
               >
                  <View>
                     <Text style={{ fontWeight: 'bold', width: 30 }}>
                        {this.props.jugador.numero}
                     </Text>
                  </View>
                  <View>
                     <Text style={styles.txt}>{this.props.jugador.nombre}</Text>
                  </View>
               </View>

               <View
                  style={[
                     {
                        flex: 2,
                        flexDirection: 'row',
                        alignContent: 'flex-end',
                        justifyContent: 'flex-end',
                     },
                  ]}
               >
                  <CheckBox
                     checked={this.state.checked}
                     onPress={() => {
                        this.setState({ checked: !this.state.checked });
                        if (!this.state.checked) {
                           this.props.estadoJugador(
                              this.props.jugador.numero,
                              'T'
                           );
                        } else {
                           this.props.estadoJugador(
                              this.props.jugador.numero,
                              'S'
                           );
                        }
                     }}
                  />
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
      flexDirection: 'row',
      marginRight: 20,
   },
   button: {
      borderWidth: 0,
      fontSize: 50,
      width: 50,
      height: 50,
      marginTop: 30,
      marginHorizontal: 20,
      backgroundColor: '#ded7d7',
   },
   txt: { fontSize: 15, padding: 5 },
});
