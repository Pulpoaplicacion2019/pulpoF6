import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { cargarPermisos } from '../../services/permisos';
import { firebase } from '@react-native-firebase/auth';
export default class Login extends Component {
   state = {
      usuario: '',
      contrasenia: '',
      errorMessage: null,
      errorMessageUser: null,
      errorMessagePass: null,
   };

   constructor(props) {
      super(props);
   }

   showError = error => {
      let mensaje;
      switch (error) {
         case 'auth/user-not-found':
            mensaje = 'Usuario no registrado';
            break;
         case 'auth/wrong-password':
            mensaje = 'Contraseña incorrecta';
            break;
         case 'auth/invalid-email':
            mensaje = 'E-mail inválido';
            break;
         default:
            mensaje = 'Error de autenticación';
            break;
      }

      this.setState({ errorMessage: mensaje });
   };
   validar = () => {
      let user = this.state.usuario;
      let pass = this.state.contrasenia;
      console.log('user', user);
      console.log('pass', pass);
      if (user == '') {
         this.setState({ errorMessageUser: 'Campo Requerido' });
      } else {
         this.setState({ errorMessageUser: null });
      }
      if (pass == '') {
         this.setState({ errorMessagePass: 'Campo Requerido' });
      } else {
         this.setState({ errorMessagePass: null });
      }
      if (user != '' && pass != '') {
         this.guardar();
      }
   };
   guardar = () => {
      global.usuario = this.state.usuario;
      console.log(this.state.usuario);
      console.log(this.state.contrasenia);
      let user = this.state.usuario;
      user = user.trim();
      firebase
         .auth()
         .signInWithEmailAndPassword(user, this.state.contrasenia)
         .then(() => {
            let usuario = global.usuario;
            usuario = usuario
               .replace(/\./g, '')
               .trim()
               .toLowerCase();
            cargarPermisos(usuario, listaPermisos => {
               global.listaTorneos = listaPermisos[0].listaTorneos;
               global.listaEquipos = listaPermisos[0].listaEquipos;
               global.listaJugadores = listaPermisos[0].listaJugadores;
               global.listaVocalia = listaPermisos[0].listaVocalia;
            });
            this.props.navigation.navigate('MisTorneos');
         })
         .catch(error => {
            this.showError(error.code);
         });
   };

   goResetPassword = () => this.props.navigation.navigate('ResetPassword');
   static navigationOptions = ({ navigation }) => ({
      headerTitle: 'Login',
      headerLeft: Platform.select({
         ios: (
            <Icon
               name="ios-log-out"
               type="ionicon"
               containerStyle={styles.icon}
               onPress={() => navigation.navigate('MisTorneosScreen')}
            />
         ),
         android: (
            <Icon
               name="md-menu"
               type="ionicon"
               containerStyle={styles.icon}
               onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
         ),
      }),
   });
   render() {
      return (
         <View style={styles.viewBody}>
            {this.state.errorMessage && (
               <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            )}
            <Input
               placeholder="Correo"
               onChangeText={text => this.setState({ usuario: text })}
               value={this.state.usuario}
               errorStyle={{ color: 'red' }}
               errorMessage={this.state.errorMessageUser}
               leftIcon={
                  <Icon
                     name="chevron-down-box"
                     type="material-community"
                     size={20}
                     color="black"
                  />
               }
            />
            <Input
               secureTextEntry
               placeholder="Contraseña"
               onChangeText={text => this.setState({ contrasenia: text })}
               value={this.state.contrasenia}
               errorStyle={{ color: 'red' }}
               errorMessage={this.state.errorMessagePass}
               leftIcon={
                  <Icon
                     name="chevron-down-box"
                     type="material-community"
                     size={20}
                     color="black"
                  />
               }
            />
            <Button
               title="Iniciar Sesión"
               onPress={() => {
                  this.validar();

                  global.objTorneos.setState({ user: this.state.usuario });
               }}
            />

            <Button
               title="Recuperar Contraseña"
               onPress={this.goResetPassword}
               titleStyle={{
                  color: '#039BE5',
               }}
               type="clear"
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   viewBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
   },
});
