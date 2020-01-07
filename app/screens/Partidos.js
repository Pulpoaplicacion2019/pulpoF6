import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import CrearPartidoV from '../components/CrearPartidoV';
import { cargarEquipos } from '../services/equipos.js';
export default class Partidos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listaEquip: [],
      };
   }
   componentDidMount() {
      var lista = global.listaCategorias;
      var categ = lista[0];

      cargarEquipos(categ, listaEquipos => {
         this.setState({
            listaEquip: this.convertirEquiposLista(listaEquipos),
         });
      });
   }
   guardar = (equipo1, equipo2, hora, minutos) => {};
   convertirEquiposLista = equipos => {
      let listaEquipos = [];
      equipos.map((item, index) => {
         console.log('item:   ' + item);
         listaEquipos.push({
            value: item.nombreEquipo,
         });
      });

      console.log('objetoCategoriasconver  ' + equipos);

      console.log('listaCategoriasconver ' + listaEquipos);
      return listaEquipos;
   };
   render() {
      return (
         <View style={styles.container}>
            <Text>Partidos</Text>
            <CrearPartidoV
               equipos={this.state.listaEquip}
               guardar={this.eliminar}
            ></CrearPartidoV>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      marginTop: 30,
   },
   button: {
      flex: 1,
      borderWidth: 1,
      marginRight: 30,
      borderColor: 'black',
   },
   txt: { flex: 2, fontSize: 20 },
});
