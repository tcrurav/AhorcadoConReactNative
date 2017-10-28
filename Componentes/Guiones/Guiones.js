/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  StyleSheet
} from 'react-native';


export default class Guiones extends Component {
  constructor(props){
    super(props);
    
  }

  getGuionesConLetterSpacing(){
    return this.props.palabraAdivinadaHastaElMomento.split('').join(' ');
  }

  render() {
    return (
      <Text style={styles.guiones}>{this.getGuionesConLetterSpacing()}</Text>
    );
  }
}


const styles = StyleSheet.create({
  guiones: {
    fontSize: 40,
    textAlign: 'center'
  }
});
