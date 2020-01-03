import React, { Component } from "react";
import { StyleSheet, View, Text ,Button} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';



export default class CrearFechaVacia extends Component {
   
  render() {
    const horas = [{ value: '6',},
     { value: '7',}, 
     { value: '8',}, 
     {value: '9',},
     {value: '10',},
     {value: '11',},
     {value: '12',},
     {value: '13',},
     {value: '14',},
     {value: '15',},
     {value: '16',},
     {value: '17',},
     {value: '18',},
     {value: '19',},
     {value: '20',},
     {value: '21',},
     {value: '22',},
     {value: '23',}
    ];
    const min = [{ value: '5',},
     { value: '10',}, 
     { value: '15',}, 
     {value: '20',},
     {value: '25',},
     {value: '30',},
     {value: '35',},
     {value: '40',},
     {value: '45',},
     {value: '50',},
     {value: '55',},
     {value: '60',}
    
    ];
    return (
            <View style={styles.container} >
				 <Dropdown
                       label='Hora'
                       data={horas}
                 /> 
                 <Dropdown
                       label='Min'
                       data={min}
                 />     
			</View>
         
    );
  }
}

const styles = StyleSheet.create ({
    container: {
       flex: 1,
       flexDirection: 'row',
       marginRight:20,
    },
    button: {
       flex: 1,
       borderWidth: 1,
       marginRight:30,
       borderColor: 'black',
    },
    txt:{flex: 2,
     fontSize:20,
       }
 })