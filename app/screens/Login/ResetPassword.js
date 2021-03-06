import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { firebase } from '@react-native-firebase/auth';
export default class ResetPassword extends Component {
   state = { correo: '', errorMessage: null, errorMessageUser: null };
   constructor(props) {
      super(props);
   }
   validar = () => {
      let user = this.state.correo;

      console.log('user', user);

      if (user == '') {
         this.setState({ errorMessageUser: 'Campo Requerido' });
      } else {
         this.setState({ errorMessageUser: null });
      }

      if (user != '') {
         this.sendMail();
      }
   };

   sendMail = () => {
      firebase
         .auth()
         .sendPasswordResetEmail(this.state.correo)
         .catch(error =>
            this.setState({
               errorMessage:
                  error.code === 'auth/invalid-email'
                     ? 'E-mail inválido'
                     : 'No se pudo enviar el correo',
            })
         );
   };

   static navigationOptions = ({ navigation }) => ({
      headerTitle: 'Recuperar Contraseña',
      headerLeft: Platform.select({}),
   });
   render() {
      return (
         <View style={styles.viewBody}>
            {this.state.errorMessage && (
               <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            )}
            <Input
               placeholder="Correo"
               onChangeText={text => this.setState({ correo: text })}
               value={this.state.correo}
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
            <Button title="Enviar Correo" onPress={() => this.validar()} />
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
