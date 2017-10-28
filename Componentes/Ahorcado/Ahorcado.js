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
  Modal,
  TouchableHighlight
} from 'react-native';
import Imagen from '../Imagen/Imagen';
import Guiones from '../Guiones/Guiones';
import Botonera from '../Botonera/Botonera';


export default class Ahorcado extends Component {
  constructor(props){
    super(props);

    this.sePulsoBoton = this.sePulsoBoton.bind(this);

    let palabra = this.getPalabraAdivinar();

    this.state = {
      numAciertos: 0,
      numFallos: 0,
      palabraAAdivinar: palabra,
      palabraAdivinadaHastaElMomento: this.inicializarPalabraAdivinadaHastaElMomento(palabra),
      botones: this.getBotones(),
      modalVisible: false,
      resultado: ''
    }
  }

  reiniciar(){
    let palabra = this.getPalabraAdivinar();
    
    this.setState({
      numAciertos: 0,
      numFallos: 0,
      palabraAAdivinar: palabra,
      palabraAdivinadaHastaElMomento: this.inicializarPalabraAdivinadaHastaElMomento(palabra),
      botones: this.getBotones(),
      modalVisible: false,
      resultado: ''
    });
  }

  getBotones(){
    let LETRAS = [ "A", "B", "C", "D", "E", "F", "G", 
                    "H", "I", "J", "K", "L", "M", "N",
                    "Ñ", "O", "P", "Q", "R", "S", "T",
                    "U", "V", "W", "X", "Y", "Z" 
                  ];

    return LETRAS.map((l) => ({ letra: l, estado: 'no-pulsado'}));
  }

  getPalabraAdivinar(){
    let PALABRAS = ["CARACOLA", "ACERTIJO", "COLOMBIA"];
    return PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
  }

  inicializarPalabraAdivinadaHastaElMomento(palabra){
    let palabraInicializada = "";
    for(let i = 0; i < palabra.length; i++){
      palabraInicializada += "-";
    }
    return palabraInicializada;
  }

  sePulsoBoton(i){
    
    let botonesAux = this.state.botones;
    let letra = botonesAux[i].letra;

    if(this.hayAcierto(letra)){
      botonesAux[i].estado = "pulsado-acertado";
      this.setState((prevState) => ({
        botones: botonesAux
      }));
    } else {
      botonesAux[i].estado = "pulsado-no-acertado";
      this.setState((prevState) => ({
        botones: botonesAux,
        numFallos: ++prevState.numFallos
      }));
    }
  }

  componentDidUpdate(){
    if(this.state.numFallos == 6){
      this.setState({
        modalVisible: true,
        resultado: '¡Perdiste!',
        numFallos: 0
      });
    }

    if(this.state.palabraAAdivinar.length == this.state.numAciertos){
      this.setState({
        modalVisible: true,
        resultado: '¡Ganaste!',
        numAciertos: 0
      });
    }
  }

  hayAcierto(letra){
    let acierto = false;

    for(let i = 0; i < this.state.palabraAAdivinar.length; i++){
      if(letra == this.state.palabraAAdivinar.substr(i, 1)){
        this.setState((prevState) => ({
          numAciertos: ++prevState.numAciertos,
          palabraAdivinadaHastaElMomento: prevState.palabraAdivinadaHastaElMomento.substr(0, i) +
                                          letra +
                                          prevState.palabraAdivinadaHastaElMomento.substr(i + 1)
        }));
        acierto = true;
      }
    }

    return acierto;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getModal()}
        <View style={styles.imagen}>
          <Imagen numFallos={this.state.numFallos}/>
        </View >
        <View style={styles.guiones}>
          <Guiones palabraAdivinadaHastaElMomento={this.state.palabraAdivinadaHastaElMomento}/>
        </View>
        <View style={styles.botonera}>
          <Botonera botones={this.state.botones}
                    sePulsoBoton={this.sePulsoBoton}/>
        </View>
      </View>
    );
  }

  getModal(){
    return (
      <Modal  animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {this.reiniciar();}}>
        <View style={styles.modalContainer}>
          <View style={styles.innerModalContainer}>
            <Text style={styles.texto}>{this.state.resultado}</Text>

            <TouchableHighlight onPress={() => { this.reiniciar(); }}
                                style={styles.button}>
              <Text style={styles.textoBoton}>Pulsa aquí para jugar otra vez</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'green'
},
imagen: {
  flex: 5,
  justifyContent: 'center',
  backgroundColor: 'yellow'
},
guiones: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red'
},
botonera: {
  flex: 3,
  justifyContent: 'center',
  backgroundColor: 'yellow'
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)'
},
innerModalContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  margin: 20
},
button: {
  flexWrap: 'wrap',
  padding: 10,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'blue',
  margin: 20
},
texto: {
  fontSize: 20,
  fontWeight: 'bold',
  margin: 20
},
textoBoton: {
  fontSize: 20,
  color: 'white'
}

});
