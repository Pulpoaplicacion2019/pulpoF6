import { firebase } from '@react-native-firebase/database';
import { crearPermiso, cargarPermisos } from './permisos.js';
export const cargarEquipos = (categoria, fn) => {
   console.log('ingresa a cargar equipos v6');
   const refEquiposRoot = firebase.database().ref('equipos');
   const refEquipos = refEquiposRoot.child(
      global.idTorneo + '/categorias/' + categoria + '/equipos/'
   );
   console.log('refEquipos ', refEquipos.path);
   const listaEquipos = [];

   refEquipos.on('child_added', snap => {
      console.log('agrega equipo ', snap);

      listaEquipos.push(snap.val());
      console.log('listaEquipos ', listaEquipos);

      fn(listaEquipos);
   });

   refEquipos.on('child_changed', snap => {
      console.log('cambia ' + snap.val().nombre);
      let i = buscar(listaEquipos, snap.val().id);
      listaEquipos[i] = snap.val();
      fn(listaEquipos);
   });

   refEquipos.on('child_removed', snap => {
      let i = buscar(listaEquipos, snap.val().id);
      console.log('posicion ' + i);
      listaEquipos.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(listaEquipos);
   });
   fn(listaEquipos);
};
export const guardarEquipos = (categoria, equipo) => {
   console.log('ingresa a guardar equipos');
   let usuario = global.usuario;
   var refEquiposRoot = firebase.database().ref('equipos');
   var refEquipo = refEquiposRoot.child(
      global.idTorneo + '/categorias/' + categoria + '/equipos/' + equipo.id
   );
   refEquipo.child('/id').set(equipo.id);
   refEquipo.child('/cedulaRepresentante').set(equipo.cedulaRepresentante);
   refEquipo.child('/nombreEquipo').set(equipo.nombreEquipo);
   refEquipo.child('/categoria').set(equipo.categoria);
   refEquipo.child('/nombreRepresentante').set(equipo.nombreRepresentante);
   refEquipo.child('/apellidoRepresentante').set(equipo.apellidoRepresentante);
   refEquipo.child('/telefono').set(equipo.telefono);
   refEquipo.child('/mail').set(equipo.mail);
   refEquipo.child('/imagenEquipo').set(equipo.imagenEquipo);
   crearPermiso(equipo.mail, 'equipos', equipo.id);
   usuario = usuario
      .replace(/\./g, '')
      .trim()
      .toLowerCase();
   cargarPermisos(usuario, listaPermisos => {
      global.listaTorneos = listaPermisos[0].listaTorneos;
      global.listaEquipos = listaPermisos[0].listaEquipos;
      global.listaPerfiles = listaPermisos[0].listaPerfiles;
      global.listaVocalia = listaPermisos[0].listaVocalia;
   });
};
export const recuperarEquipo = (equipo, fn) => {
   console.log('ingresa a cargar equipo');
   var refEquiposRoot = firebase.database().ref('equipos');
   var refEquipo = refEquiposRoot.child(
      global.idTorneo +
         '/categorias/' +
         equipo.categoria +
         '/equipos/' +
         equipo.id
   );
   refEquipo.on('value', snap => {
      fn(snap.val());
   });
};
export const eliminarEquipo = equipo => {
   console.log('ingresa a eliminar equipos');
   var refEquiposRoot = firebase.database().ref('equipos');
   var refEquipo = refEquiposRoot
      .child(
         global.idTorneo +
            '/categorias/' +
            equipo.categoria +
            '/equipos/' +
            equipo.id
      )
      .remove(() => {
         console.log('Operation Complete');
      });
};
export const buscar = (listaEquipos, id) => {
   let posicion = -1;
   let iteracion = 0;
   listaEquipos.forEach(element => {
      if (element.id == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
