import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { cargarEquipos } from '../../services/equipos.js';
import ItemEquipos from '../../components/ItemEquipos';
import NavegadorCategorias from '../../components/NavegadorCategorias.js';
import styles from '../../Styles/styles';
import { buscarPermiso } from '../../services/permisos';

export default class Equipos extends Component {
   constructor(props) {
      super(props);
      var lista = global.listaCategorias;
      var categ = lista[0];
      this.state = {
         listaCat: lista,
         categoria: categ,
         listaEquip: [],
      };

      cargarEquipos(categ, listaEquipos => {
         this.setState({ listaEquip: listaEquipos });
      });
   }
   static navigationOptions = {
      tabBarLabel: 'Equipos',
      tabBarIcon: ({ tintColor }) => {
         let iconName = Platform.select({
            ios: 'ios-basketball',
            android: 'md-basketball',
         });
         return <Icon name={iconName} type="ionicon" color={tintColor} />;
      },
   };
   state = {
      listaCat: [],
      index: 0,
      categoria: '',
      listaEquip: [],
   };

   componentDidMount() {}
   renderActionButton = () => {
      let usuario = global.usuario;
      let torneoActual = global.idTorneo;
      let listaTorneos = global.listaTorneos;
      if (listaTorneos) {
         let permiso = buscarPermiso(listaTorneos, torneoActual);
         console.log('renderActionButton' + usuario);
         console.log('torneoActual' + torneoActual);
         if (usuario && permiso != -1) {
            return (
               <ActionButton
                  buttonColor="#00A680"
                  onPress={() => {
                     this.props.navigation.navigate('CrearEquipos', {
                        categoria: this.state.categoria,
                        listaEquipos: this.state.listaEquip,
                        modo: 'C',
                     });
                  }}
               />
            );
         }
      }
   };

   render() {
      return (
         <View style={styles.container}>
            <Container>
               <Header style={styles.headerCategoria}>
                  <NavegadorCategorias
                     pintar={categ => {
                        cargarEquipos(categ, listaEquipos => {
                           this.setState({ listaEquip: listaEquipos });
                        });
                        this.setState({ categoria: categ });
                     }}
                  />
               </Header>
               <Content>
                  <View>
                     <ItemEquipos
                        lista={this.state.listaEquip}
                        nav={this.props.navigation}
                        categoria={this.state.categoria}
                     />
                  </View>
               </Content>
            </Container>
            {this.renderActionButton()}
         </View>
      );
   }
}
