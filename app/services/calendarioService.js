import { firebase } from '@react-native-firebase/database';

export const loadTeams = (fn, categoria) => {
   //Referencia firebase
   let itemsRef = firebase.database().ref('calendario/torneos');
   let itemChildRef = itemsRef.child(
      global.idTorneo + '/categorias/' + categoria
   );

   console.log('referencia obtenida: ' + itemChildRef);

   listenForItems(itemChildRef, fn);
};

// Función como ingreso tiene la referencia
export const listenForItems = (itemsRef, fn) => {
   //Creamos una array que va a guardar el valor obtenido en la referencia

   let listResult = [];
   itemsRef.on('value', snap => {
      let data = snap.val();
      listResult = Object.values(data);
      //object.setState({ listCalendarios: listResult });
      fn(listResult);
   });
};
//guardar fechas
export const cargarFechas = (categoria, fecha, fn) => {
   console.log('ingresa a cargar equipos v6');
   const refFechasRoot = firebase.database().ref('calendario/torneos');
   const refFechas = refFechasRoot.child(
      global.idTorneo + '/categorias/' + categoria + '/' + fecha + '/fechas'
   );
   console.log('refFechas ' + refFechas.path);
   const listaFechas = [];

   refFechas.on('child_added', snap => {
      console.log('agrega fechas ', snap);

      listaFechas.push(snap.val());
      console.log('listaFechas ', listaFechas);
      fn(listaFechas);
   });

   refFechas.on('child_changed', snap => {
      console.log('cambia ' + snap.val().nombre);
      let i = buscar(snap.val().id);
      listaFechas[i] = snap.val();
      fn(listaFechas);
   });

   refFechas.on('child_removed', snap => {
      let i = buscar(snap.val().id);
      console.log('posicion ' + i);
      listaFechas.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(listaFechas);
   });
};
export const eliminarFechas = (categoria, fecha, fechaEliminar, fn) => {
   console.log('ingresa a eliminar fechas v6');
   const refFechasRoot = firebase.database().ref('calendario/torneos');
   const refFechas = refFechasRoot
      .child(
         global.idTorneo +
            '/categorias/' +
            categoria +
            '/' +
            fecha +
            '/fechas/' +
            fechaEliminar
      )
      .remove(() => {
         console.log('Operation Complete');
      });
   console.log('refFechas ' + refFechas.path);
};

buscar = id => {
   let posicion = -1;
   let iteracion = 0;
   listaPersonas.forEach(element => {
      if (element.id == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
export const guardarFechas = (categoria, fecha, fechas) => {
   console.log('ingresa a guardar fecha');
   var itemsRef = firebase
      .database()
      .ref('calendario/torneos')
      .child(global.idTorneo + '/categorias/' + categoria + '/' + fecha);
   itemsRef.set(fechas);
};
export const recuperarFecha = (categoria, fecha, fn) => {
   var fechasRef = firebase
      .database()
      .ref(
         'calendario/' +
            'torneos/' +
            global.idTorneo +
            '/categorias/' +
            categoria +
            '/' +
            fecha +
            '/fechas'
      );
   fechasRef.on('value', snap => {
      console.log('recuperar Fecha' + snap);
      fn(snap.val());
   });
};
