import {firebase} from "@react-native-firebase/database";

export const loadTeams = (fn, categoria) => {
  //Referencia firebase
  let itemsRef = firebase.database().ref("calendario/torneos");
  let itemChildRef = itemsRef.child(
    global.idTorneo + "/categorias/" + categoria
  );

  console.log("referencia obtenida: " + itemChildRef);

  listenForItems(itemChildRef, fn);
};

// Función como ingreso tiene la referencia
export const listenForItems = (itemsRef, fn) => {
  //Creamos una array que va a guardar el valor obtenido en la referencia

  let listResult = [];
  itemsRef.on("value", snap => {
    let data = snap.val();
    listResult = Object.values(data);
    //object.setState({ listCalendarios: listResult });
    fn(listResult);
  });
};
