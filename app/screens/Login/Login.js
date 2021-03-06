import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { cargarPermisos } from '../../services/permisos';
import { firebase } from '@react-native-firebase/auth';
import PerfilesUsuarios from '../Login/PerfilesUsuarios';
import {
   GoogleSignin,
   GoogleSigninButton,
   statusCodes,
 } from '@react-native-community/google-signin';

export default class Login extends Component {
   state = {
      usuario: '',
      contrasenia: '',
      errorMessage: null,
      errorMessageUser: null,
      errorMessagePass: null,
      infoUsuario: null, 
      loggedIn: true
   };

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      GoogleSignin.configure({
        webClientId: '616527640285-7jr93itadhs48qpg90jan9dum7uobgff.apps.googleusercontent.com', 
      });
    }
   static navigationOptions = {
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor }) => {
         let iconName = Platform.select({
            ios: 'ios-person',
            android: 'md-person',
         });
         return <Icon name={iconName} type="ionicon" color={tintColor} />;
      },
   };

    signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const infoUsuario = await GoogleSignin.signIn();
        this.setState({ infoUsuario: infoUsuario, loggedIn: true });
        this.loginGoogle();
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log("error1")
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log("error2")
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         console.log("error3")
        } else {
         console.log("Play services error", error);
        }
      }
    };

    loginGoogle = () => {
      global.usuario = this.state.infoUsuario.user.email;
       firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(this.state.infoUsuario.idToken)).then(() => {
         let usuario = global.usuario;
         usuario = usuario.replace(/\./g, '');
         this.props.navigation.navigate('MisTorneos')
      })
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
               global.listaPerfiles = listaPermisos[0].listaPerfiles;
               global.listaVocalia = listaPermisos[0].listaVocalia;
            });
            this.props.navigation.navigate('MisTorneos');
            Login.navigationOptions = {
               drawerLabel: () => null,
               drawerIcon: () => null,
            };
            PerfilesUsuarios.navigationOptions = {
               drawerLabel: 'Perfiles',
               drawerIcon: ({ tintColor }) => {
                  let iconName = Platform.select({
                     ios: 'ios-person',
                     android: 'md-person',
                  });
                  return (
                     <Icon name={iconName} type="ionicon" color={tintColor} />
                  );
               },
            };
         })
         .catch(error => {
            this.showError(error.code);
         });
   };

   goResetPassword = () => this.props.navigation.navigate('ResetPassword');

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

            <GoogleSigninButton
              style={{ width: 312, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={() => {
               this.signIn();
              }}
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
