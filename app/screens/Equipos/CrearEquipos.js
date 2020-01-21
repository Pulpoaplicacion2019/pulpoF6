import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { Input, Avatar, Button } from "react-native-elements";
import { guardarEquipos, recuperarEquipo } from "../../services/equipos.js";

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  }
});

export default class CrearEquipos extends Component {
  state = {
    uri: "",
    id: "",
    nombreEquipo: "",
    categoria: "",
    nombreRepresentante: "",
    apellidoRepresentante: "",
    telefono: "",
    mail: "",
    imagenEquipo: ""
  };
  guardar = () => {
    let idEquipo = this.state.nombreEquipo + "_" + this.state.categoria;
    let equipo = {
      id: idEquipo,
      nombreEquipo: this.state.nombreEquipo,
      categoria: this.state.categoria,
      nombreRepresentante: this.state.nombreRepresentante,
      apellidoRepresentante: this.state.apellidoRepresentante,
      telefono: this.state.telefono,
      mail: this.state.mail,
      imagenEquipo: this.state.uri
    };
    guardarEquipos(this.state.categoria, equipo);
    this.props.navigation.goBack();
  };
  pintarImagen = uriCargado => {
    this.setState({ uri: uriCargado });
  };

  componentDidMount() {
    let equipoDatos = this.props.navigation.getParam("equipo", {categoria:this.props.navigation.getParam("categoria", null)});
    this.setState({
      categoria: equipoDatos.categoria
    });
    recuperarEquipo(equipoDatos, equipo => {
      if (equipo != null) {
        this.setState({
          id: equipo.id,
          nombreEquipo: equipo.nombreEquipo,
          categoria: equipo.categoria,
          nombreRepresentante: equipo.nombreRepresentante,
          apellidoRepresentante: equipo.apellidoRepresentante,
          telefono: equipo.telefono,
          mail: equipo.mail,
          imagenEquipo: equipo.imagenEquipo,
          uri: equipo.imagenEquipo
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.viewBody}>
        <Avatar
          size="xlarge"
          rounded
          title="CR"
          source={this.state.uri ? { uri: this.state.uri } : null}
          onEditPress={() =>
            this.props.navigation.navigate("CargarImagen", {
              url: "torneos",
              fn: this.pintarImagen,
              imagenActual: { uri: this.state.uri }
            })
          }
          activeOpacity={0.7}
          showEditButton={true}
          editButton={{
            underlayColor: "#000",
            color: "#6E2665",
            name: "mode-edit",
            type: "material",
            containerStyle: "#6E2665",
            reverse: true,
            size: 30
          }}
        />
        <Input
          placeholder="Nombre Equipo"
          leftIcon={{ type: "font-awesome", name: "dribbble" }}
          onChangeText={value => this.setState({ nombreEquipo: value })}
          value={this.state.nombreEquipo}
        />
        <Input
          placeholder="Nombre Representante"
          leftIcon={{ type: "font-awesome", name: "user-circle" }}
          onChangeText={value => this.setState({ nombreRepresentante: value })}
          value={this.state.nombreRepresentante}
        />
        <Input
          label="Categoria"
          disabled={true}
          leftIcon={{ type: "font-awesome", name: "user-circle" }}
          value={this.state.categoria}
        />
        <Input
          placeholder="Apellido Representante"
          leftIcon={{ type: "font-awesome", name: "user-circle" }}
          onChangeText={value =>
            this.setState({ apellidoRepresentante: value })
          }
          value={this.state.apellidoRepresentante}
        />
        <Input
          placeholder="Correo"
          keyboardType="email-address"
          leftIcon={{ type: "font-awesome", name: "inbox" }}
          onChangeText={value => this.setState({ mail: value })}
          value={this.state.mail}
        />
        <Input
          placeholder="Teléfono"
          keyboardType="number-pad"
          leftIcon={{ type: "font-awesome", name: "phone" }}
          onChangeText={value => this.setState({ telefono: value })}
          value={this.state.telefono}
        />
        <Button
          large
          icon={{ name: "cached" }}
          title="GUARDAR"
          onPress={this.guardar}
        />
      </View>
    );
  }
}
