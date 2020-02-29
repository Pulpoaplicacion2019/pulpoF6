import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import {
   guardarEquipos,
   recuperarEquipo,
   buscar,
} from '../../services/equipos.js';
import { guardarPerfiles } from '../../services/perfiles';

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
      cedulaRepresentante: '',
      nombreEquipo: '',
      categoria: '',
      nombreRepresentante: '',
      apellidoRepresentante: '',
      telefono: '',
      mail: '',
      imagenEquipo: '',
      errMsjEquipo: null,
      errMsjNombreRepresentante: null,
      errMsjApellidoRepresentante: null,
      errMsjTlfRepresentante: null,
      errMsjCorreo: null,
   };
   validar = () => {
      let equipo = this.state.nombreEquipo;
      let nombreRepresentante = this.state.nombreRepresentante;
      let apellidoRepresentante = this.state.apellidoRepresentante;
      let tlfRepresentante = this.state.telefono;
      let cedulaRepresentante = this.state.cedulaRepresentante;
      let correo = this.state.mail;
      let existeEquipo = -1;
      let modo = this.props.navigation.getParam('modo', null);
      let listaEquipos = this.props.navigation.getParam('listaEquipos', null);
      let valCorreo = 'N';

      if (equipo == '') {
         this.setState({ errMsjEquipo: 'Campo Requerido' });
      } else {
         if (modo == 'C') {
            let idEquipo = this.state.nombreEquipo + '_' + this.state.categoria;
            existeEquipo = buscar(listaEquipos, idEquipo);
            if (existeEquipo != -1) {
               this.setState({ errMsjEquipo: 'Equipo ya existe' });
            } else {
               this.setState({ errMsjEquipo: null });
            }
         } else {
            this.setState({ errMsjEquipo: null });
         }
      }
      if (nombreRepresentante == '') {
         this.setState({ errMsjNombreRepresentante: 'Campo Requerido' });
      } else {
         this.setState({ errMsjNombreRepresentante: null });
      }
      if (apellidoRepresentante == '') {
         this.setState({ errMsjApellidoRepresentante: 'Campo Requerido' });
      } else {
         this.setState({ errMsjApellidoRepresentante: null });
      }
      if (tlfRepresentante == '') {
         this.setState({ errMsjTlfRepresentante: 'Campo Requerido' });
      } else {
         this.setState({ errMsjTlfRepresentante: null });
      }
      if (cedulaRepresentante == '') {
         this.setState({ errMsjCedulaRepresentante: 'Campo Requerido' });
      } else {
         this.setState({ errMsjCedulaRepresentante: null });
      }
      if (correo == '') {
         this.setState({ errMsjCorreo: 'Campo Requerido' });
      } else if (
         /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            correo
         )
      ) {
         this.setState({ errMsjCorreo: null });
         valCorreo = 'S';
      } else {
         this.setState({ errMsjCorreo: 'E-mail inválido' });
         valCorreo = 'N';
      }

      if (
         equipo != '' &&
         nombreRepresentante != '' &&
         apellidoRepresentante != '' &&
         tlfRepresentante != '' &&
         cedulaRepresentante != '' &&
         correo != '' &&
         valCorreo == 'S' &&
         existeEquipo == -1
      ) {
         this.guardar();
      }
   };
   guardar = () => {
      let idEquipo = this.state.nombreEquipo + '_' + this.state.categoria;
      let equipo = {
         id: idEquipo,
         cedulaRepresentante: this.state.cedulaRepresentante,
         nombreEquipo: this.state.nombreEquipo,
         categoria: this.state.categoria,
         nombreRepresentante: this.state.nombreRepresentante,
         apellidoRepresentante: this.state.apellidoRepresentante,
         telefono: this.state.telefono,
         mail: this.state.mail,
         imagenEquipo: this.state.uri,
      };
      let infoPerfil = {
         cedula: this.state.cedulaRepresentante,
         nombre: this.state.nombreRepresentante,
         apellido: this.state.apellidoRepresentante,
         telefono: this.state.telefono,
         correo: this.state.mail,
         rol: 'Representante del Equipo',
         foto:
            'https://firebasestorage.googleapis.com/v0/b/pulpoapp2019-36a53.appspot.com/o/default%2Favatar-default.png?alt=media&token=6abbf4e5-5859-46d0-b5ae-d4bfc76a0739',
      };
      guardarEquipos(this.state.categoria, equipo);
      guardarPerfiles(infoPerfil);
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
               cedulaRepresentante: equipo.cedulaRepresentante,
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
                  errorMessage={this.state.errMsjEquipo}
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
                  label={'Cédula Representante'}
                  placeholder=""
                  onChangeText={value =>
                     this.setState({ cedulaRepresentante: value })
                  }
                  value={this.state.cedulaRepresentante}
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjCedulaRepresentante}
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
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjNombreRepresentante}
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
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjApellidoRepresentante}
               />

               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Correo'}
                  placeholder=""
                  onChangeText={value => this.setState({ mail: value })}
                  value={this.state.mail}
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjCorreo}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Teléfono'}
                  placeholder=""
                  onChangeText={value => this.setState({ telefono: value })}
                  value={this.state.telefono}
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjTlfRepresentante}
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
      );
   }
}
