import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity,Image,FlatList,KeyboardAvoidingView,ScrollView } from "react-native";
import { Avatar, Input ,Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import FilaFecha from '../components/FilaFecha.js';
import DatePicker from 'react-native-datepicker'

export default class CrearFecha extends Component {

    constructor(props){
        super(props)
        this.state = {date:"2016-05-15",
        listaFechas: []
    }
      }

     elegirfecha=(date)=>{
        const fechas=this.state.listaFechas;
        const position=this.buscarFecha(fechas,date);
        if(position==-1){
          fechas.push(date);
          this.setState({listaFechas:fechas})}
          
        }
        buscarFecha=(fechas,date)=>{
            let posicion=-1
            let iteracion=0
            console.log('buscar: '+fechas.length);
            fechas.forEach(element => {
              console.log('element: '+element);
                if(element==date){
                    posicion=iteracion
          
                }
                iteracion++
            });
            return posicion;
          }
          eliminarFecha= (date)=>{
            const fechas=this.state.listaFechas;
            let i = this.buscarFecha(fechas,date);
            console.log('posicion '+i);
            fechas.splice( i, 1 );
          
            this.setState({listaFechas:fechas})
          }
  render() {
    return (
      <View >
        <DatePicker
        style={{width:400,
            marginTop:10}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date});this.elegirfecha(date)}}
      />
      
      <FlatList
      style={styles.lista}
        data={this.state.listaFechas}
        renderItem={({ item }) => <FilaFecha fecha={item} fnEliminarFecha={this.eliminarFecha}/>}
        keyExtractor={item => item}
      />
      </View>
     
    );
  }
}

// Estilos para el view que se esta pintando en la pantalla
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginTop:2,
   marginLeft:10,
   
    backgroundColor: "#fff"
  },
  lista:{
marginTop:20,
padding:20
  }

});
