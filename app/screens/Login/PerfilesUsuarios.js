import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native';
import ItemPerfiles from '../../components/ItemPerfiles';
import { cargarPerfiles } from '../../services/perfiles.js';
import styles from '../../Styles/styles';
import { Icon } from 'react-native-elements';

export default class PerfilesUsuarios extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listaPerfiles: [],
      };
   }
   static navigationOptions = {
      drawerLabel: () => null,
      drawerIcon: () => null,
   };
   cargarPerfiles = () => {
      let listaCedulas = global.listaPerfiles;
      console.log(listaCedulas);
      if (listaCedulas) {
         cargarPerfiles(listaCedulas, listaPerfiles => {
            console.log(listaPerfiles);
            this.setState({
               listaPerfiles: listaPerfiles,
            });
         });
      }
   };
   componentDidMount() {
      this.cargarPerfiles();
   }

   render() {
      return (
         <ScrollView>
            <View style={styles.containerPerfiles}>
               <View style={styles.header}>
                  <Icon
                     name="arrow-back"
                     type="material-icons"
                     style={styles.button}
                     onPress={() => this.props.navigation.goBack()}
                  />
                  <Text style={styles.labelBold}>
                     PERFILES ASOCIADOS A LA CUENTA
                  </Text>
               </View>
               <FlatList
                  data={this.state.listaPerfiles}
                  renderItem={({ item }) => (
                     <ItemPerfiles
                        datos={item}
                        navigation={this.props.navigation}
                     />
                  )}
                  keyExtractor={item => item}
               />
            </View>
         </ScrollView>
      );
   }
}
