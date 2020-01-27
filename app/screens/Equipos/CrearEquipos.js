import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import { guardarEquipos, recuperarEquipo } from '../../services/equipos.js';

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
      uri: '',
      id: '',
      nombreEquipo: '',
      categoria: '',
      nombreRepresentante: '',
      apellidoRepresentante: '',
      telefono: '',
      mail: '',
      imagenEquipo: '',
   };
   guardar = () => {
      let idEquipo = this.state.nombreEquipo + '_' + this.state.categoria;
      let equipo = {
         id: idEquipo,
         nombreEquipo: this.state.nombreEquipo,
         categoria: this.state.categoria,
         nombreRepresentante: this.state.nombreRepresentante,
         apellidoRepresentante: this.state.apellidoRepresentante,
         telefono: this.state.telefono,
         mail: this.state.mail,
         imagenEquipo: this.state.uri,
      };
      guardarEquipos(this.state.categoria, equipo);
      this.props.navigation.goBack();
   };
   pintarImagen = uriCargado => {
      this.setState({ uri: uriCargado });
   };

   componentDidMount() {
      let equipoDatos = this.props.navigation.getParam('equipo', {
         categoria: this.props.navigation.getParam('categoria', null),
      });
      this.setState({
         categoria: equipoDatos.categoria,
      });
      recuperarEquipo(equipoDatos, equipo => {
         if (equipo != null) {
            this.setState({
               id: equipo.id,
               nombreEquipo: equipo.nombreEquipo,
               categoria: equipo.categoria,
               nombreRepresentante: equipo.nombreRepresentante,
               apellidoRepresentante: equipo.apellidoRepresentante,
               telefono: equipo.telefono,
               mail: equipo.mail,
               imagenEquipo: equipo.imagenEquipo,
               uri: equipo.imagenEquipo,
            });
         }
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
                  title="CR"
                  source={this.state.uri ? { uri: this.state.uri } : null}
                  onEditPress={() =>
                     this.props.navigation.navigate('CargarImagen', {
                        url: 'torneos',
                        fn: this.pintarImagen,
                        imagenActual: { uri: this.state.uri },
                     })
                  }
                  activeOpacity={0.7}
                  showEditButton={true}
                  editButton={{
                     underlayColor: '#000',
                     color: '#6E2665',
                     name: 'mode-edit',
                     type: 'material',
                     containerStyle: '#6E2665',
                     reverse: true,
                     size: 30,
                  }}
               />
            </View>
            <View style={[styles.viewContainer]}>
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Nombre Equipo'}
                  placeholder=""
                  onChangeText={value => this.setState({ nombreEquipo: value })}
                  value={this.state.nombreEquipo}
                  errorStyle={{ color: 'red' }}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Nombre Representante'}
                  placeholder=""
                  onChangeText={value =>
                     this.setState({ nombreRepresentante: value })
                  }
                  value={this.state.nombreRepresentante}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Apellido del representante'}
                  placeholder=""
                  onChangeText={value =>
                     this.setState({ apellidoRepresentante: value })
                  }
                  value={this.state.apellidoRepresentante}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  disabled={true}
                  label={'Categoria'}
                  placeholder=""
                  value={this.state.categoria}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Correo'}
                  placeholder=""
                  onChangeText={value => this.setState({ mail: value })}
                  value={this.state.mail}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Teléfono'}
                  placeholder=""
                  onChangeText={value => this.setState({ telefono: value })}
                  value={this.state.telefono}
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
