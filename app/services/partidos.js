import { firebase } from '@react-native-firebase/database';

export const cargarPartidos = (categoria, fecha, fn) => {
   console.log('ingresa a cargar equipos v6');
   const refPartidosRoot = firebase.database().ref('calendario/torneos');
   const refPartidos = refPartidosRoot.child(
      global.idTorneo + '/categorias/' + categoria + '/' + fecha + '/partidos'
   );
   console.log('refPartidos ' + refPartidos.path);
   const listaPartidos = [];

   refPartidos.on('child_added', snap => {
      console.log('agrega partidos ', snap);

      listaPartidos.push(snap.val());
      console.log('listaPartidos ', listaPartidos);
      fn(listaPartidos);
   });

   refPartidos.on('child_changed', snap => {
      console.log('child_changed ');
      let i = buscarP(listaPartidos, snap.val().id);
      listaPartidos[i] = snap.val();
      fn(listaPartidos);
   });

   refPartidos.on('child_removed', snap => {
      let i = buscarP(listaPartidos, snap.val().id);
      console.log('posicion ' + i);
      listaPartidos.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(listaPartidos);
   });
};
buscarP = (listaPartidos, id) => {
   let posicion = -1;
   let iteracion = 0;
   listaPartidos.forEach(element => {
      if (element.id == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
export const guardarPartido = (categoria, fecha, id, partido) => {
   console.log('ingresa a guardar partido');
   var itemsRef = firebase
      .database()
      .ref(
         'calendario/torneos/' +
            global.idTorneo +
            '/categorias/' +
            categoria +
            '/' +
            fecha
      )
      .child('partidos/' + id);
   itemsRef.set(partido);
};
export const eliminarPartidos = (categoria, fecha, partidoEliminar, fn) => {
   console.log('ingresa a eliminar partidos v6');
   const refPartidosRoot = firebase.database().ref('calendario/torneos');
   const refPartidos = refPartidosRoot
      .child(
         global.idTorneo +
            '/categorias/' +
            categoria +
            '/' +
            fecha +
            '/partidos/' +
            partidoEliminar
      )
      .remove(() => {
         console.log('Operation Complete');
      });
};
export const cargarJugadores = (categoria, equipo, fn) => {
   console.log('ingresa a cargar equipos v6');
   const refPartidosRoot = firebase.database().ref('equipos');
   const refPartidos = refPartidosRoot.child(
      global.idTorneo +
         '/categorias/' +
         categoria +
         '/equipos/' +
         equipo +
         '/jugadores'
   );
   console.log('refPartidos ' + refPartidos.path);
   const listaJugadores = [];
   let objJugador = {};
   let obj = {};
   refPartidos.once('child_added', snap => {
      console.log('agrega jugadores ', snap);

      obj = snap.val();

      objJugador['num' + obj.numero] = {
         numero: obj.numero,
         nombre: obj.primerNombre + ' ' + obj.primerApellido,
         puntosQ1: '00',
         puntosQ2: '00',
         puntosQ3: '00',
         puntosQ4: '00',
      };
      console.log('obJugador ', objJugador);

      listaJugadores.push(objJugador);
      console.log('listaJugadores ', listaJugadores);
      fn(listaJugadores);
   });
};
