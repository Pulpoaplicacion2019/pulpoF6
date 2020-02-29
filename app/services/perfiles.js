import { firebase } from '@react-native-firebase/database';
import { crearPermiso } from './permisos.js';
export const cargarPerfiles = (listaCedulas, fn) => {
   console.log('ingresa a cargar perfiles');
   const listaPerfiles = [];
   listaCedulas.forEach(perfil => {
      recuperarPerfil(perfil, datosPerfil => {
         let i = buscar(listaPerfiles, datosPerfil.cedula);

         if (i != -1) {
            listaPerfiles[i] = datosPerfil;
         } else {
            listaPerfiles.push(datosPerfil);
         }

         console.log(datosPerfil);
         console.log(listaPerfiles);
         fn(listaPerfiles);
      });
   });
   console.log('termina perfiles');
};
export const recuperarPerfil = (id, fn) => {
   console.log('ingresa a cargar perfil');
   var refPerfilesRoot = firebase.database().ref('perfiles');
   var refPerfiles = refPerfilesRoot.child(id);
   refPerfiles.on('value', snap => {
      fn(snap.val());
   });
};
export const guardarPerfiles = perfil => {
   console.log('ingresa a guardar perfiles');
   var refPerfilesRoot = firebase.database().ref('perfiles');
   var refPerfiles = refPerfilesRoot.child(perfil.cedula);
   // refPerfiles.set(perfil);

   refPerfiles.child('/cedula').set(perfil.cedula);
   refPerfiles.child('/nombre').set(perfil.nombre);
   refPerfiles.child('/apellido').set(perfil.apellido);
   refPerfiles.child('/telefono').set(perfil.telefono);
   refPerfiles.child('/correo').set(perfil.correo);
   refPerfiles.child('/foto').set(perfil.foto);
   refPerfiles.child('/rol').set(perfil.rol);
   crearPermiso(perfil.correo, 'perfiles', perfil.cedula);
};
export const buscar = (listaPerfiles, id) => {
   let posicion = -1;
   let iteracion = 0;
   listaPerfiles.forEach(element => {
      if (element.cedula == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
