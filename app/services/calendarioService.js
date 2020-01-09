import { firebase } from '@react-native-firebase/database';

let keyItem = '';

export const loadTeams = (fn, categoria) => {
   //Referencia firebase
   console.log('Ingresa a cargar lista de Calendarios');
   console.log('Categoria' + categoria);

   let itemsRef = firebase.database().ref('calendario');
   let itemChildRef = itemsRef.child(
      'torneos/' + global.idTorneo + '/categorias/' + categoria
   );
   const listaResultado = [];
   listenForItems(itemChildRef, fn, listaResultado);
};

// Función como ingreso tiene la referencia
export const listenForItems = (itemsRef, fn, lista) => {
   console.log('Metodo listenForItems >> itemsRef: ' + itemsRef);

   let listaPartidos = [];
   // Se ejecuta cuando se añade elementos
   itemsRef.on('child_added', snap => {
      console.log('Se ejecuta al añadir elemento');

      keyItem = snap.key;
      listaPartidos = Object.values(snap._snapshot.value.partidos);

      lista.push({ id: keyItem, listaPartidos: listaPartidos });
      console.log('Lista: ' + lista);
      fn(lista);
   });

   // Se ejecuta cuando se modifica un elemento
   itemsRef.on('child_changed', snap => {
      console.log('Se ejecuta al cambiar elemento' + snap.val().id);
      let i = buscar(snap.val().id, lista);
      lista[i] = snap.val();
      //object.setState({ listCalendarios: listaResultado });
      fn(lista);
   });

   // Se ejecuta cuando se elimina un elemento
   itemsRef.on('child_removed', snap => {
      let i = buscar(snap.val().id, lista);
      console.log('posicion ' + i);
      lista.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(lista);
   });
};

// Metodo de busqueda de objetos en la lista y devuelve la posicion
const buscar = (id, list) => {
   let posicion = -1;
   let iteracion = 0;
   list.forEach(element => {
      if (element.id === id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
