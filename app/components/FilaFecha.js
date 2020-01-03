import React, { Component } from "react";
import { StyleSheet, View, Text ,Button} from "react-native";




export default class FilaFecha extends Component {
   
  render() {
    return (
            <View style={styles.container} >
				<Text style={styles.txt} >{this.props.fecha}</Text>
                <Button style={styles.button} title='E' onPress={()=>{this.props.fnEliminarFecha(this.props.fecha)}}></Button>
                      
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