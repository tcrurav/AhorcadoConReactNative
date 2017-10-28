/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';


export default class Botonera extends Component {
  constructor(props){
    super(props);
    
  }

  getBotones(){
    return this.props.botones.map(
      (boton, index) => 
        <TouchableHighlight onPress={() => this.props.sePulsoBoton(index)}
                            key={index}
                            underlayColor="white">
          <View style={boton.estado == "no-pulsado" ? 
                          styles.botonNoPulsado : (
                             boton.estado == "pulsado-acertado" ? styles.botonPulsadoAcertado :
                                                                  styles.botonPulsadoNoAcertado  )}>
            <Text style={styles.textoBoton}>{boton.letra}</Text>
          </View>
        </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.botonera}>
        {this.getBotones()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  botonera: {    
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  botonNoPulsado: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  botonPulsadoAcertado: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  botonPulsadoNoAcertado: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  textoBoton: {
    fontSize: 20,
    color: 'white'
  }
});