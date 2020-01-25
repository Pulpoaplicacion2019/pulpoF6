import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Button,
   TouchableOpacity,
   Modal,
   TouchableHighlight,
   Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { COLOR_CHRISTMAS_RED, COLOR_BLANCO } from '../constants/colors';

export default class modalSuplentes extends Component {
   render() {
      return (
         <View style={{ flex: 1 }}>
            <Text>Modal para los suplentes</Text>
         </View>
      );
   }
}
