import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Image,
   FlatList,
   KeyboardAvoidingView,
   ScrollView,
} from 'react-native';
import { Avatar, Input, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import FilaFecha from '../components/FilaFecha.js';
import {
   guardarFechas,
   recuperarFecha,
   eliminarFechas,
} from '../services/calendarioService.js';
import DatePicker from 'react-native-datepicker';

export default class CrearFecha extends Component {
   constructor(props) {
      super(props);
      this.state = { date: this.date, listaFechas: [], fecha: 'Fecha' };
   }

   elegirfecha = date => {
      const fechas = this.state.listaFechas;
      const position = this.buscarFecha(fechas, date);
      if (position == -1) {
         fechas.push(date);
         this.setState({ listaFechas: fechas });
      }
   };
   buscarFecha = (fechas, date) => {
      let posicion = -1;
      let iteracion = 0;
      console.log('buscar: ' + fechas.length);
      fechas.forEach(element => {
         console.log('element: ' + element);
         if (element == date) {
            posicion = iteracion;
         }
         iteracion++;
      });
      return posicion;
   };
   eliminarFecha = date => {
      const fechasob = this.convertirFechas(this.state.listaFechas);
      console.log('ingresa componentDidMount ');

      const categ = global.categoria;
      const fecha = this.state.fecha + 1;

      eliminarFechas(categ, fecha, date, fechas => {
         console.log('fechas: ' + fechas);
         this.setState({
            listaFechas: this.convertirFechasLista(fechas),
         });
      });
   };
   componentDidMount() {
      console.log('ingresa componentDidMount ');

      const categ = global.categoria;
      const fecha = this.state.fecha + 1;
      recuperarFecha(categ, fecha, fechas => {
         console.log('fechas: ' + fechas);
         this.setState({
            listaFechas: this.convertirFechasLista(fechas),
         });
      });
   }

   convertirFechasLista = objetoFechas => {
      console.log('ingresa convertirFechasLista ' + objetoFechas);
      let listaFechas = [];
      Object.keys(objetoFechas).forEach(item => {
         listaFechas.push(item);
      });
      console.log('listaFechas ' + listaFechas);
      return listaFechas;
   };
   guardar = () => {
      let fechasO = this.convertirFechas(this.state.listaFechas);

      const categ = global.categoria;
      const fecha = this.state.fecha + 1;
      const fechas = {
         fechas: fechasO,
      };
      guardarFechas(categ, fecha, fechas);
   };
   convertirFechas = fechas => {
      let objetoFechas = {};
      fechas.forEach(item => {
         objetoFechas[item] = item;
      });
      return objetoFechas;
   };
   render() {
      return (
         <View>
            <DatePicker
               style={{ width: 400, marginTop: 10 }}
               date={this.state.date}
               mode="date"
               placeholder="select date"
               format="YYYY-MM-DD"
               minDate="2016-05-01"
               maxDate="2080-06-01"
               confirmBtnText="Confirm"
               cancelBtnText="Cancel"
               customStyles={{
                  dateIcon: {
                     position: 'absolute',
                     left: 0,
                     top: 4,
                     marginLeft: 0,
                  },
                  dateInput: {
                     marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
               }}
               onDateChange={date => {
                  this.setState({ date: date });
                  this.elegirfecha(date);
                  this.guardar();
               }}
            />

            <FlatList
               style={styles.lista}
               data={this.state.listaFechas}
               renderItem={({ item }) => (
                  <FilaFecha
                     fecha={item}
                     fnEliminarFecha={this.eliminarFecha}
                  />
               )}
            />
         </View>
      );
   }
}

// Estilos para el view que se esta pintando en la pantalla
const styles = StyleSheet.create({
   viewBody: {
      flex: 1,
      marginTop: 2,
      marginLeft: 10,

      backgroundColor: '#fff',
   },
   lista: {
      marginTop: 20,
      padding: 20,
   },
});
