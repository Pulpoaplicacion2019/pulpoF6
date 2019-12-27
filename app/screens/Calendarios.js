import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";

import { Image } from "react-native-elements";

//Importación componente de navegación
import NavegadorCategorias from "../components/NavegadorCategorias.js";

// Importación de constantes de color
import * as COLOR from "../constants/colors.js";
import StatusBarGeneral from "../components/StatusBarGeneral.js";
import * as CONSTANTES from "../constants/constantes.js";

// Importación componente de extración de firebase
import { loadTeams } from "../services/calendarioService.js";
import { Container, Content, Header } from "native-base";

const NOMBRE_CLASE = "Calendarios";

export default class Calendarios extends Component {
  constructor() {
    super();
    this.state = {
      listCalendarios: null,
      categoria: ""
    };
  }

  componentDidMount() {
    var listaCategorias = global.listaCategorias;
    var categ = listaCategorias[0];
    console.log(NOMBRE_CLASE + ">> Lista global:" + listaCategorias);
    loadTeams(lista => {
      this.setState({ listCalendarios: lista });
    }, categ);
  }

  renderRow = listCalendarios => {
    const {
      equipoUno,
      equipoDos,
      fecha,
      hora,
      minuto,
      cancha
    } = listCalendarios.item;

    return (
      <View style={styles.viewPartidos}>
        <View style={styles.viewEquipoUno}>
          <Image
            resizeMode="cover"
            source={{ cancha }}
            style={[styles.imagenEstilo, border("#7A7A7A")]}
          />
          <Text style={styles.viewNombreEquipo}>{equipoUno}</Text>
        </View>
        <View style={[styles.viewDatos]}>
          <Text>{fecha}</Text>
          <Text>
            {hora}:{minuto}
          </Text>
          <Text>cancha: {cancha}</Text>
        </View>
        <View style={styles.viewEquipoUno}>
          <Image
            resizeMode="cover"
            source={{ cancha }}
            style={[styles.imagenEstilo, border("#7A7A7A")]}
          />
          <Text style={styles.viewNombreEquipo}>{equipoDos}</Text>
        </View>
      </View>
    );
  };

  renderFlatList = listCalendarios => {
    if (listCalendarios) {
      return (
        <FlatList
          data={this.state.listCalendarios}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else {
      return (
        <View style={styles.startLoadCalendarios}>
          <Text>Cargando Calendairio </Text>
        </View>
      );
    }
  };

  render() {
    const { listCalendarios } = this.state;
    return (
      <Container>
        <Header style={styles.header}>
          <NavegadorCategorias
            pintar={categ => {
              loadTeams(lista => {
                this.setState({ listCalendarios: lista });
              }, categ);
            }}
          ></NavegadorCategorias>
        </Header>
        <Content>
          <View style={styles.viewBody}>
            {this.renderFlatList(listCalendarios)}
          </View>
        </Content>
        <StatusBarGeneral></StatusBarGeneral>
      </Container>
    );
  }
}

const border = color => {
  return { borderColor: color, borderWidth: 2, backgroundColor: color };
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  startLoadCalendarios: { marginTop: 20, alignItems: "center" },
  viewEquipoUno: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  viewNombreEquipo: { fontSize: 9 },
  viewPartidos: {
    flexDirection: "row",
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    padding: 5,
    backgroundColor: COLOR.COLOR_SNOWY_MOUNT,
    borderRadius: CONSTANTES.BORDER_RADIUS,
    height: 90
  },
  imagenEstilo: { width: 60, height: 60 },
  viewDatos: { flex: 2, justifyContent: "center", alignItems: "center" },
  header: {
    backgroundColor: COLOR.COLOR_SECUNDARIO,
    marginTop: 2
  }
});
