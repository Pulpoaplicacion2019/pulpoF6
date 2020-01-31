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
            <View>
               <Text>Numero</Text>
               <Text>{nombre}</Text>
               <Text>numero</Text>
               <Text>{numero}</Text>
               <CheckBox
                  checked={this.state.checked}
                  onPress={() => {
                     this.setState({ checked: !this.state.checked });
                     if (!this.state.checked) {
                        this.guardarEstadoJ(
                           numero,
                           'T',
                           this.props.refJugadores
                        );
                        this.guardarEstadoJ(
                           this.props.numJugador,
                           'S',
                           this.props.refJugadores
                        );
                     } else {
                        this.guardarEstadoJ(
                           numero,
                           'S',
                           this.props.refJugadores
                        );
                        this.guardarEstadoJ(
                           this.props.numJugador,
                           'T',
                           this.props.refJugadores
                        );
                     }
                  }}
               />
            </View>
         );
      }
   };

   render() {
      let { isModalVisible } = this.props;
      modalVisibleSuplente = this.props.isModalVisible;
      console.log('isModalVisible', modalVisibleSuplente);
      console.log('lista en Modal Render', this.props.listaSuplente);
      return (
         <Modal visible={isModalVisible}>
            <View style={{ flex: 1 }}>
               <Text>Modal para los suplentes</Text>
               <FlatList
                  data={this.props.listaSuplente}
                  renderItem={this.renderRow}
                  keyExtractor={(item, index) => index.toString()}
               />
               <Button
                  small
                  title="Cancelar"
                  onPress={() => {
                     console.log(isModalVisible);
                     this.props.suplente(!isModalVisible);
                  }}
               />
            </View>
         </Modal>
      );
   }
}
