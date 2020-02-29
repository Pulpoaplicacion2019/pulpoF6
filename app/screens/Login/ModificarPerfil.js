import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { guardarPerfiles, recuperarPerfil } from '../../services/perfiles';

// importación archivo de colores
import * as COLOR from '../../constants/colors.js';
import PerfilTorneo from '../Torneos/PerfilTorneo';

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

export default class ModificarPerfil extends Component {
   state = {
      uri: '',
      id: '',
      nombre: '',
      apellido: '',
      cedula: '',
      correo: '',
      telefono: '',
      rol: '',
   };
   validar = () => {
      let primerNombre = this.state.nombre;
      let primerApellido = this.state.apellido;
      let telefono = this.state.telefono;

      if (primerNombre == '') {
         this.setState({ errMsjNombre: 'Campo Requerido' });
      } else {
         this.setState({ errMsjNombre: null });
      }
      if (primerApellido == '') {
         this.setState({ errMsjApellido: 'Campo Requerido' });
      } else {
         this.setState({ errMsjApellido: null });
      }
      if (telefono == '') {
         this.setState({ errMsjTelefono: 'Campo Requerido' });
      } else {
         this.setState({ errMsjTelefono: null });
      }

      if (primerNombre != '' && primerApellido != '' && telefono != '') {
         this.guardar();
      }
   };
   guardar = () => {
      let infoPerfil = {
         cedula: this.state.cedula,
         nombre: this.state.nombre,
         apellido: this.state.apellido,
         telefono: this.state.telefono,
         correo: this.state.correo,
         rol: this.state.rol,
         foto: this.state.uri,
      };

      guardarPerfiles(infoPerfil);
      this.props.navigation.navigate('PerfilesUsuariosScreen');
   };

   componentDidMount() {
      let idPerfil = this.props.navigation.getParam('id', null);

      recuperarPerfil(idPerfil, datosPerfil => {
         if (datosPerfil != null) {
            this.setState({
               cedula: datosPerfil.cedula,
               nombre: datosPerfil.nombre,
               apellido: datosPerfil.apellido,
               telefono: datosPerfil.telefono,
               correo: datosPerfil.correo,
               rol: datosPerfil.rol,
               uri: datosPerfil.foto,
            });
         }
      });
   }
   pintarImagen = uriCargado => {
      this.setState({ uri: uriCargado });
   };
   render() {
      return (
         <View>
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
            <ScrollView>
               <View style={[styles.viewContainer]}>
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Cédula'}
                     disabled={true}
                     placeholder=""
                     value={this.state.cedula}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Correo'}
                     disabled={true}
                     placeholder=""
                     value={this.state.correo}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Rol'}
                     disabled={true}
                     value={this.state.rol}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Nombre'}
                     placeholder=""
                     onChangeText={value => this.setState({ nombre: value })}
                     value={this.state.nombre}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjNombre}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Apellido'}
                     placeholder=""
                     onChangeText={value => this.setState({ apellido: value })}
                     value={this.state.apellido}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjApellido}
                  />

                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Teléfono'}
                     onChangeText={value => this.setState({ telefono: value })}
                     value={this.state.telefono}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjTelefono}
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
                        onPress={this.validar}
                        buttonStyle={{
                           backgroundColor: COLOR.COLOR_CHRISTMAS_RED,
                           borderRadius: 0,
                        }}
                     />
                  </View>
               </View>
            </ScrollView>
         </View>
      );
   }
}
