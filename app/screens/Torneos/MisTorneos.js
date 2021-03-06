import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import ItemTorneos from '../../components/ItemTorneos';
import { cargarTorneosEnCurso } from '../../services/torneos.js';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import styles from '../../Styles/styles';
import ActionButton from 'react-native-action-button';

// importación del archivo de colores
import * as COLOR from '../../constants/colors.js';

export default class Example extends Component {
   static navigationOptions = {
      tabBarLabel: 'Mis Torneos',
      tabBarIcon: ({ tintColor }) => {
         let iconName = Platform.select({
            ios: 'ios-basketball',
            android: 'md-basketball',
         });
         return <Icon name={iconName} type="ionicon" color={tintColor} />;
      },
   };

   constructor() {
      super();
      this.state = {
         urlResult: '',
         idLayout: 'torneo',
         listaTorneos: [],
         user: '',
      };
      cargarTorneosEnCurso(torneos => {
         this.setState({ listaTorneos: torneos });
      });
   }

   componentDidMount() {
      this.setState({ user: global.usuario });
   }
   componentWillUnmount() {
      console.log('salir');
   }

   renderActionButton = () => {
      let usuario = this.state.user;
      if (usuario) {
         usuario = usuario.toLowerCase().trim();
      }
      console.log('renderActionButton' + usuario);
      if (usuario == 'pulpoapp2019@gmail.com') {
         return (
            <ActionButton
               buttonColor={COLOR.COLOR_AMARILLO}
               onPress={() => {
                  global.idTorneo = null;
                  this.props.navigation.navigate('PerfilTorneo', {
                     editar: 'N',
                  });
               }}
            />
         );
      }
   };
   render() {
      return (
         <View style={[styles.container]}>
            <ItemTorneos
               torneos={this.state.listaTorneos}
               nav={this.props.navigation}
            />
            {this.renderActionButton()}
         </View>
      );
   }
}
