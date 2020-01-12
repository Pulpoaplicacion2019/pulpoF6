import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Button } from 'native-base';
import { Icon } from 'react-native-elements';

import * as COLOR from '../constants/colors.js';

export default class NavegadorCategorias extends Component {
   state = {
      listaCat: [],
      index: 0,
      categoria: '',
   };
   next = () => {
      var indice = this.state.index;

      ++indice;
      if (indice < this.state.listaCat.length) {
         var categ = this.state.listaCat[indice];
         this.props.pintar(categ);
         this.setState({
            index: indice,
            categoria: categ,
         });
         global.categoria = categ;
      }
   };
   back = () => {
      var indice = this.state.index;

      --indice;
      if (indice >= 0) {
         var categ = this.state.listaCat[indice];
         this.props.pintar(categ);
         this.setState({
            index: indice,
            categoria: categ,
         });
         global.categoria = categ;
      }
   };
   componentDidMount() {
      var lista = global.listaCategorias;
      var categ = lista[0];
      this.setState({
         listaCat: lista,
         categoria: categ,
      });
   }
   render() {
      return (
         <View style={styles.container}>
            <View style={styles.arrows}>
               <Button transparent>
                  <Icon
                     name="menu-left"
                     type="material-community"
                     color="#fff"
                     size={50}
                     onPress={this.back}
                  />
               </Button>
            </View>
            <View style={styles.title}>
               <Title>{this.state.categoria}</Title>
            </View>
            <View style={styles.arrows}>
               <Button transparent>
                  <Icon
                     name="menu-right"
                     type="material-community"
                     color="#fff"
                     size={50}
                     onPress={this.next}
                  />
               </Button>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   arrows: {
      flex: 1,
   },
   container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.COLOR_SECUNDARIO,
      flexDirection: 'row',
      flex: 1,
   },
   title: {
      flex: 4,
   },
});
