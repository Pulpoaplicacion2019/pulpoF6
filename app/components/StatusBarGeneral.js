import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native';

import * as COLOR from '../constants/colors.js';

export default class StatusBarGeneral extends Component {
   render() {
      return (
         <View>
            <StatusBar
               barStyle="light-content"
               backgroundColor={COLOR.COLOR_SECUNDARIO}
            />
         </View>
      );
   }
}
