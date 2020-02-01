import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Modal,
   TouchableHighlight,
   Alert,
   FlatList,
} from 'react-native';
import { Icon, Input, Avatar, Button, CheckBox } from 'react-native-elements';
import { COLOR_CHRISTMAS_RED, COLOR_BLANCO } from '../constants/colors';
import { guardarEstadoJugador } from '../services/vocalia.js';
let modalVisibleSuplente;

export default class ModalSuplentes extends Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      console.log('lista en Modal', this.props.listaSuplente);
   }
   guardarEstadoJ = (numero, estado, jugadores) => {
      let ref = 'num' + numero;
      guardarEstadoJugador(estado, jugadores, ref);
   };

   renderRow = listaSuplentesP => {
      console.log('Ingreso a pintar los suplentes');

      const { nombre, numero } = listaSuplentesP.item;

      if (listaSuplentesP) {
         return (
            <TouchableHighlight
               onPress={() => {
                  console.log(modalVisibleSuplente);
                  this.props.suplente(!modalVisibleSuplente);
                  this.guardarEstadoJ(
                     this.props.numJugador,
                     'S',
                     this.props.refJugadores
                  );
                  this.guardarEstadoJ(numero, 'T', this.props.refJugadores);
               }}
            >
               <View
                  style={{
                     flex: 1,
                     flexDirection: 'row',
                     backgroundColor: '#fff',
                     height: 50,
                     padding: 10,
                  }}
               >
                  <View style={{ width: '12%' }}>
                     <Text>{numero}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                     <Text>{nombre}</Text>
                  </View>

                  <View>
                     <Icon
                        name="chevron-right"
                        type="material-community"
                        color="#000"
                        size={25}
                     />
                  </View>
               </View>
            </TouchableHighlight>
         );
      }
   };

   render() {
      let { isModalVisible } = this.props;
      modalVisibleSuplente = this.props.isModalVisible;
      console.log('isModalVisible', modalVisibleSuplente);
      console.log('lista en Modal Render', this.props.listaSuplente);
      return (
         <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
         >
            <View
               style={{
                  flex: 1,
                  backgroundColor: 'rgba(35, 35, 35, 0.9)',
                  paddingTop: 150,
                  paddingHorizontal: 20,
               }}
            >
               <View
                  style={[
                     {
                        flexDirection: 'column',
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: '#fff',
                     },
                  ]}
               >
                  <View
                     style={{
                        height: 50,
                        backgroundColor: COLOR_CHRISTMAS_RED,
                        alignItems: 'center',
                     }}
                  >
                     <Text style={{ color: COLOR_BLANCO, fontSize: 30 }}>
                        Suplentes
                     </Text>
                  </View>
                  <View>
                     <FlatList
                        data={this.props.listaSuplente}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                     />
                  </View>

                  <View>
                     <Button
                        small
                        title="Cancelar"
                        onPress={() => {
                           console.log(isModalVisible);
                           this.props.suplente(!isModalVisible);
                        }}
                     />
                  </View>
               </View>
            </View>
         </Modal>
      );
   }
}
