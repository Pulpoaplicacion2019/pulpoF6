import { firebase } from '@react-native-firebase/database';

const listResult = [];

export const loadTeams = (fn, categoria) => {
   //Referencia firebase
   console.log('Ingresa a cargar lista de Calendarios');
   console.log('Categoria' + categoria);

   let itemsRef = firebase.database().ref('calendario');
   let itemChildRef = itemsRef.child(
      'torneos/' + global.idTorneo + '/categorias/' + categoria
   );

   listenForItems(itemChildRef, fn);
};

// Función como ingreso tiene la referencia
export const listenForItems = (itemsRef, fn) => {
   console.log('Metodo listenForItems >> itemsRef: ' + itemsRef);

   // Se ejecuta cuando se añade elementos
   itemsRef.on('child_added', snap => {
      console.log('Se ejecuta al añadir elemento');

      let keyItem = snap.key;
      console.log(keyItem);

      listResult.push(snap.val());
      console.log('Lista: ' + listResult);
      fn(listResult);
   });

   // Se ejecuta cuando se modifica un elemento
   itemsRef.on('child_changed', snap => {
      console.log('Se ejecuta al cambiar elemento' + snap.val().id);
      let i = buscar(snap.val().id);
      listResult[i] = snap.val();
      //object.setState({ listCalendarios: listResult });
      fn(listResult);
   });

   // Se ejecuta cuando se elimina un elemento
   itemsRef.on('child_removed', snap => {
      let i = buscar(snap.val().id);
      console.log('posicion ' + i);
      listResult.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(listResult);
   });
};

// Metodo de busqueda de objetos en la lista y devuelve la posicion
const buscar = id => {
   let posicion = -1;
   let iteracion = 0;
   listResult.forEach(element => {
      if (element.id === id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
