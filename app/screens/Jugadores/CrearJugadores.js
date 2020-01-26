import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import { guardarJugador } from '../../services/jugadores.js';

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

export default class CrearJugadores extends Component {
   state = {
      uri: '',
      id: '',
      nombre: '',
      apellido: '',
      cedula: '',
      mail: '',
      equipo: {},
   };
   guardar = () => {
      let jugador = {
         cedula: this.state.cedula,
         primerNombre: this.state.nombre,
         primerApellido: this.state.apellido,
         telefono: this.state.telefono,
         mail: this.state.mail,
      };
      guardarJugador(this.state.equipo, jugador);
      this.props.navigation.goBack();
   };

   componentDidMount() {
      let equipoDatos = this.props.navigation.getParam('equipo', null);
      this.setState({
         equipo: equipoDatos,
      });
   }
   render() {
      return (
         <ScrollView>
            <View style={[styles.viewContainer]}>
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Cédula'}
                  placeholder="102453685"
                  onChangeText={value => this.setState({ cedula: value })}
                  value={this.state.cedula}
                  errorStyle={{ color: 'red' }}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Nombre Jugador'}
                  placeholder="Mariana"
                  onChangeText={value => this.setState({ nombre: value })}
                  value={this.state.nombre}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Apellido del jugador'}
                  placeholder="Solis"
                  onChangeText={value => this.setState({ apellido: value })}
                  value={this.state.apellido}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Correo'}
                  placeholder="equipo@torneo.com"
                  onChangeText={value => this.setState({ mail: value })}
                  value={this.state.mail}
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
                     onPress={this.guardar}
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
