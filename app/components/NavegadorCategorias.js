import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body } from 'native-base';
import { Icon } from "react-native-elements";


const styles = StyleSheet.create({
  arrows: {
    flex: 1
  },
  container: {
		justifyContent: 'center',
        backgroundColor: '#eb1c24',
        flexDirection:'row',
        flex:1

	},
   title: {
		flex:4
	}
});
export default class NavegadorCategorias extends Component {
    state = {
        listaCat : [],
        index:0,
        categoria:''
     }
next = () => {
       var indice = this.state.index;
       
       ++indice;
       if(indice < this.state.listaCat.length){
         var categ = this.state.listaCat[indice];
         var lista = this.state.listaCat;
         this.props.pintar(categ);
          this.setState({
           index: indice,
           categoria: categ
         });
      }
     
     }
 back = () => {
       var indice = this.state.index;
       
       --indice;
       if(indice >= 0){
          var categ = this.state.listaCat[indice];
        var lista = this.state.listaCat;
        this.props.pintar(categ);
          this.setState({
           index: indice,
           categoria: categ
         });
      }
     
     }
     componentDidMount() {
        var lista = global.listaCategorias;
       var categ = lista[0];
      this.setState({
         listaCat: lista,
         categoria:categ
       });
 
     }
  render() {
    return (
      
      <View style={styles.container}>
      
                          <View style={styles.arrows}>
                              <Button transparent>
                                  <Icon name='keyboard-arrow-left' onPress={this.back} />
                              </Button>
                          </View>
                          <View style={styles.title}>
                              <Title>{this.state.categoria}</Title>
                          </View>
                          <View style={styles.arrows}>
                              <Button transparent>
                                  <Icon name='keyboard-arrow-right' onPress={this.next} />
                              </Button>
                           </View>
      </View>       
    );
  }
}

