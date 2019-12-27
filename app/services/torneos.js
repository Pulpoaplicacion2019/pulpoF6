import {firebase} from '@react-native-firebase/database';

export const cargarTorneos =(object)=>{
	console.log("ingresa a cargar");
    global.itemsRef = firebase.database().ref('torneos');	  
	listenForItems(itemsRef,object);
}	
export const recuperarTorneo =(fn)=>{
	var torneoRef=firebase.database().ref('torneos/'+global.idTorneo);
	torneoRef.once('value', (snap) => {
		fn(snap.val());
	});
}
export const guardarTorneo =(torneo)=>{
    console.log("ingresa a cargar equipos");
   var itemsRef = firebase.database().ref('torneos').child(torneo.nombreTorneo+'_'+torneo.anio);
   itemsRef.set(torneo)
}
listenForItems = (itemsRef,object) => {
    itemsRef.on('value', (snap) => {
      snap.forEach((child) => {
		 if(buscarTorneo(child.val().id) == null){
			global.torneos.push(child.val());        
		 }else{
				reemplazarTorneo(child.val());
		 }
      });
		object.setState({
    	listaTorneos: global.torneos
	  });

	  if(global.enCursoComponent!=null){
		cargarTorneo("C",enCursoComponent,1);
	  }

	  if(global.porIniciarComponent!=null){
		cargarTorneo("I",porIniciarComponent,1);
	  }

	  if(global.favoritosComponent!=null){
		cargarTorneo(true,favoritosComponent,2);
	  }

    });
  }

  cargarTorneo=(estado,componente,modo)=>{
	var lista = [];
	for(var i = 0; i<global.torneos.length; i++){
		if(modo == 1){
			if(global.torneos[i].estado ==estado){
				lista.push(global.torneos[i]);
			  }
		}else if(modo == 2){
			if(global.torneos[i].favorito == estado){
				lista.push(global.torneos[i]);
			  }else{
				  if(lista.length>0){
					lista.splice(i,1);
				  }
				  
			  }
		}
	}
	componente.setState({listaTorneos:lista });
  }
  
  buscarTorneo = (idTorneo) =>{
	  var i = 0;
	  var torneosTmp = global.torneos;
	  var torneo = null;
	  for(i=0;i<torneosTmp.length;i++){
		  if(torneosTmp[i].id == idTorneo){
			  torneo = torneosTmp[i];
			  break;
		  }
	  }
	  return torneo;
  }

buscarPosicionTorneo = (idTorneo) => {
	  var i = 0, pos=-1;
	  var torneosTmp = global.torneos;
	  for(i=0;i<torneosTmp.length;i++){
		  if(torneosTmp[i].id == idTorneo){
			pos = i;	  
		}
	  }
	  return pos;
	
}
reemplazarTorneo = (torneo) =>{
	var posicion = buscarPosicionTorneo(torneo.id);
	if(posicion!=-1){
		global.torneos[posicion]=torneo;
	}
}