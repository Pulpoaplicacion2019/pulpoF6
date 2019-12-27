import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';


export default class ItemComponent extends Component {
	static propTypes = {
      
	};
   state = {
     urlResult: "rutaMal"
   }


	render() {
		return (
			<View style={styles.itemsList}>
				{this.props.lista.map((item, index) => {
					return (
						<View key={index}>
					