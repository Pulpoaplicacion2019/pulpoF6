import { firebase } from '@react-native-firebase/database';

let keyItem = '';

export const loadTeams = (fn, categoria) => {
   //Referencia firebase
   console.log('Ingresa a cargar lista de Calendarios');
   console.log('Categoria' + categoria);

   if (categoria != null) {
      let itemsRef = firebase.database().ref('calendario');
      let itemChildRef = itemsRef.child(
         'torneos/' + global.idTorneo + '/categorias/' + categoria
      );
      const listaResultado = [];
      listenForItems(itemChildRef, fn, listaResultado);
   }
};

// Función como ingreso tiene la referencia
export const listenForItems = (itemsRef, fn, lista) => {
   console.log('Metodo listenForItems >> itemsRef: ' + itemsRef);

   let listaFechas = [];
   let i = 0;
   let nombreItem = '';
   // Se ejecuta cuando se añade elementos
   itemsRef.on('child_added', snap => {
      console.log('Se ejecuta al añadir elemento');

      keyItem = snap.key;
      nombreItem = snap.val().nombre;
      let listaPartidos = [];
      if (snap.val().partidos) {
         listaPartidos = Object.values(snap.val().partidos);
      }
      if (snap._snapshot.value.fechas) {
         listaFechas = Object.values(snap._snapshot.value.fechas);
      }

      lista.push({
         numeroItem: i,
         nombreItem: nombreItem,
         id: keyItem,
         listaPartidos: listaPartidos,
         listaFechas: listaFechas,
      });
      i = i + 1;
      console.log('Lista:', lista);
      fn(lista);
   });

   // Se ejecuta cuando se modifica un elemento
   itemsRef.on('child_changed', snap => {
      console.log('Se ejecuta al cambiar elemento' + snap.val().id);
      let listaPartidos = [];
      if (snap._snapshot.value.partidos) {
         listaPartidos = Object.values(snap._snapshot.value.partidos);
      }
      if (snap._snapshot.value.fechas) {
         listaFechas = Object.values(snap._snapshot.value.fechas);
      }
      let listao = [];
      listao.push({
         id: snap.key,
         listaPartidos: listaPartidos,
         listaFechas: listaFechas,
      });
      let i = buscar(snap.key, lista);

      lista[i] = listao[0];
      //object.setState({ listCalendarios: listaResultado });
      fn(lista);
   });

   // Se ejecuta cuando se elimina un elemento
   itemsRef.on('child_removed', snap => {
      let i = buscar(snap.key, lista);
      console.log('posicion ' + i);
      lista.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(lista);
   });
   fn(lista);
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
   const refFechasRoot = firebase.database().ref('calendario/torneos/');
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
      if (snap.val() != null) {
         console.log('recuperar Fecha' + snap);
         fn(snap.val());
      } else fn([]);
   });
};
