import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
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
import { loadTeams } from '../../services/equipos.js';

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
   labelEstilo: { color: COLOR.COLOR_SECUNDARIO },
   inputContentEstilo: {
      backgroundColor: '#ffff',
      borderWidth: 1,
      borderColor: COLOR.COLOR_GRIS_CLARO,
      borderRadius: 8,
      paddingStart: 5,
   },
});
const border = color => {
   return { borderColor: color, borderWidth: 2 };
};

export default class CrearEquipos extends Component {
   state = {
      listaCat: [],
      index: 0,
      categoria: '',
      listaEquip: [],
   };
   save = () => {
      var indice = this.state.index;
   };

   componentDidMount() {
      var lista = global.listaCategorias;
      this.setState({
         listaCat: lista,
      });
   }
   render() {
      return (
         <ScrollView>
            <View
               style={{
                  backgroundColor: COLOR.COLOR_SECUNDARIO,
                  alignItems: 'center',
                  padding: 20,
               }}
            >
               <Avatar
                  size="xlarge"
                  rounded
                  icon={{ name: 'dribbble', type: 'font-awesome' }}
                  onPress={() => console.log('Works!')}
               />
            </View>

            <Button
               icon={{ name: 'insert-photo' }}
               title="Cargar"
               buttonStyle={{
                  backgroundColor: COLOR.COLOR_CHRISTMAS_RED,
                  borderRadius: 0,
               }}
            />
            <View style={[styles.viewContainer]}>
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Nombre Equipo'}
                  placeholder="Pitufitos"
                  errorStyle={{ color: 'red' }}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Nombre Representante'}
                  placeholder="Mariana"
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Apellido del representante'}
                  placeholder="Solis"
                  onChangeText={value => this.setState({ apellido: value })}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Correo'}
                  placeholder="equipo@torneo.com"
                  onChangeText={value => this.setState({ mail: value })}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Teléfono'}
                  placeholder="0999999999"
                  onChangeText={value => this.setState({ phone: value })}
               />
               <View
                  style={{
                     marginTop: 20,
                     height: 100,
                  }}
               >
                  <Button
                     large
                     icon={{ name: 'cached' }}
                     title="Guardar"
                     onPress={this.save}
                     buttonStyle={{
                        backgroundColor: COLOR.COLOR_CHRISTMAS_RED,
                        borderRadius: 0,
                     }}
                  />
               </View>
            </View>
         </ScrollView>
      );
   }
}
