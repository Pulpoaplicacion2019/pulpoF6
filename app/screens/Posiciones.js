import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import {
   Table,
   TableWrapper,
   Row,
   Rows,
   Col,
   Cols,
   Cell,
} from 'react-native-table-component';
import { cargarPosiciones } from '../services/posiciones.js';
export default class Posiciones extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tableHead: ['', 'PJ', 'PG', 'PP', 'Ptos'],
         tableData: [
            ['1', '2', '3', '4', '4'],
            ['a', 'b', 'c', 'd', '4'],
            ['1', '2', '3', '456\n789', '4'],
            ['a', 'b', 'c', 'd', '4'],
         ],
         lista: [],
      };
   }
   componentDidMount() {
      var categ = global.categoria;

      cargarPosiciones(categ, listaPosiciones => {
         this.setState({
            tableData: this.convertirTablaLista(listaPosiciones),
         });
      });
   }
   convertirTablaLista = tabla => {
      let listaF = [];
      tabla.map((item, index) => {
         console.log('item:   ' + item);
         listaF.push([
            item.nombre,
            item.partidosJugados,
            item.partidosGanados,
            item.partidosPerdidos,
            item.puntos,
         ]);
      });

      console.log('listaF:   ' + listaF);
      return listaF;
   };
   render() {
      const state = this.state;
      return (
         <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
               <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.text}
               />
               <Rows data={state.tableData} textStyle={styles.text} />
            </Table>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
   head: { height: 40, backgroundColor: '#f1f8ff' },
   text: { margin: 6 },
});
