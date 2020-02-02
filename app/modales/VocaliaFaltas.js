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
import { Row } from 'native-base';
let modalVisibleFaltas;

export default class ModalFaltas extends Component {
   constructor() {
      super();
      this.state = {};
   }
   render() {
      let { isModalVisible, numJugador, faltaJugador } = this.props;
      modalVisibleFaltas = this.props.isModalVisible;
      console.log('isModalVisible', modalVisibleFaltas);
      console.log('lista en Modal Render', this.props.numJugador);
      return (
         <Modal
            animationType="slide"
            transparent={false}
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
                        Faltas
                     </Text>
                  </View>

                  <View
                     style={{
                        flexDirection: 'row',
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                     }}
                  >
                     <View style={{ flex: 1 }}>
                        <Text>{numJugador}</Text>
                     </View>
                     <View style={{ flexDirection: 'row', flex: 2 }}>
                        <View
                           style={{
                              width: 35,
                              height: 35,
                              borderWidth: 1,
                              borderRadius: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                           }}
                        >
                           <Icon
                              name="plus"
                              type="material-community"
                              color="#000"
                              size={25}
                           />
                        </View>
                        <View
                           style={{
                              width: 35,
                              height: 35,
                              borderWidth: 1,
                              borderRadius: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                           }}
                        >
                           <Text style={{ fontSize: 20 }}>{faltaJugador}</Text>
                        </View>

                        <View
                           style={{
                              width: 35,
                              height: 35,
                              borderWidth: 1,
                              borderRadius: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                           }}
                        >
                           <Icon
                              name="minus"
                              type="material-community"
                              color="#000"
                              size={25}
                           />
                        </View>
                     </View>
                  </View>
                  <Button
                     small
                     title="Cancelar"
                     onPress={() => {
                        console.log(isModalVisible);
                        this.props.falta(!isModalVisible);
                     }}
                  />
               </View>
            </View>
         </Modal>
      );
   }
}
