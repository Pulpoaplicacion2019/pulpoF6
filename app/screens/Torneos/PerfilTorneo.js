import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity,Image,FlatList,AsyncStorage,Dimensions,cScrollView } from "react-native";
import { Avatar, Input ,Icon, Button } from 'react-native-elements';
import {guardarTorneo,recuperarTorneo} from '../../services/torneos.js';

import DatePicker from 'react-native-datepicker'

export default class PerfilTorneo extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      anio:'',
      date:this.date,
      nombreTorneo:'',
      fechaRegistro:'',
      estado:'A',
      fechaInicio:'',
      nombreOrganizador:'',
      apellidoOrganizador:'',
      correoOrganizador:'',
      telefonoOrganizador:'',
      favorito:'false',
      uri:''
    };
   
  };
    
/*listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
     var torneoFirebase =snap.val();
     this.setState({
    	torneo:torneoFirebase
      });
        });
  }*/
  
	componentDidMount() {
     const itemsRef = recuperarTorneo((torneo)=>{this.setState({
		 anio:torneo.anio,
		 nombreTorneo:torneo.nombreTorneo,
         fechaRegistro:torneo.fechaRegistro,
         estado:torneo.estado,
         fechaInicio:torneo.fechaInicio,
         nombreOrganizador:torneo.nombreOrganizador,
         apellidoOrganizador:torneo.apellidoOrganizador,
         correoOrganizador:torneo.correoOrganizador,
         telefonoOrganizador:torneo.telefonoOrganizador,
         favorito:torneo.favorito,
         uri:torneo.imagenTorneo
	 })}); 
  }

   
guardar = () => {
  const torneo= {
    anio:this.state.anio,
    apellidoOrganizador:this.state.apellidoOrganizador,
    correoOrganizador:this.state.correoOrganizador,
    estado:this.state.estado,
    favorito:this.state.favorito,
    nombreTorneo:this.state.nombreTorneo,
    fechaInicio:this.state.fechaInicio,
    id:this.state.nombreTorneo+'_'+this.state.anio,
    imagenTorneo:this.state.uri,
    nombreOrganizador:this.state.nombreOrganizador,
    nombreTorneo:this.state.nombreTorneo,
    telefonoOrganizador:this.state.telefonoOrganizador
  }  
  guardarTorneo(torneo);
  this.props.navigation.goBack();
}
  
  
 
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
 
pintarImagen=(uriCargado)=>{
this.setState({uri:uriCargado})
}
  render() {
    
    return (
      <View >
        
        <Avatar
              size="xlarge"
              rounded
              title="CR"
              source={this.state.uri?{uri:this.state.uri}:null}
              onEditPress={()=>this.props.navigation.navigate("CargarImagen",{url:'torneos',fn:this.pintarImagen, imagenActual:{uri:this.state.uri}})}
              activeOpacity={0.7}
              showEditButton= {true}
              editButton={{underlayColor:'#000',color: '#6E2665', name: 'mode-edit', type: 'material',containerStyle:'#6E2665',reverse:true,size:30}}
          />
           
          <Input value= {this.state.uri}
          
                leftIcon={ <Icon name='account-group' type="material-community" size={20} color='black' />}
               
         />
          <Input placeholder='Año'
                onChangeText={text => this.setState({anio:text})}
                value={this.state.anio}
                leftIcon={ <Icon name='chevron-down-box' type="material-community" size={20} color='black' />}
         />
          <Input placeholder= 'Nombre Torneo'
                onChangeText={text => this.setState({nombreTorneo:text})}
                value={this.state.nombreTorneo}
           
                leftIcon={ <Icon name='account-group' type="material-community" size={20} color='black' />}
               
         />
         <Input placeholder='Nombre Organizador'
                onChangeText={text => this.setState({nombreOrganizador:text})}
                value={this.state.nombreOrganizador}
                leftIcon={ <Icon name='account-arrow-right' type="material-community"  size={20} color='black' />}
         />

         <Input placeholder='Apellido Organizador'
                onChangeText={text => this.setState({apellidoOrganizador:text})}
                value={this.state.apellidoOrganizador}
                leftIcon={ <Icon name='account-arrow-right' type="material-community"  size={20} color='black' />}
         />
          <Input placeholder='Telefono Organizador'
                 onChangeText={text => this.setState({telefonoOrganizador:text})}
                value={this.state.telefonoOrganizador}
                leftIcon={ <Icon name='phone-in-talk' type="material-community" size={20} color='black' />}
         />
         <Input placeholder='Correo Organizador'
                onChangeText={text => this.setState({correoOrganizador:text})}
                value={this.state.correoOrganizador}
                leftIcon={ <Icon name='chevron-down-box' type="material-community" size={20} color='black' />}
         />
         <Input placeholder= {this.state.fechaInicio}
                leftIcon={ <Icon name='calendar' type="material-community" size={20} color='black' />}
         />

         <Button title="GUARDAR" onPress={this.guardar}/>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5
  },

  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
   alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',

  },

  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});


