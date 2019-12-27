import {firebase} from '@react-native-firebase/database';


const refPersonas=firebase.database().ref("/personas");
let listaPersonas;
global.registarListenerPersonas=false;

export const guardar=(persona,callback)=>{
    //await
    refPersonas.child(persona.id).set({id:persona.id,nombre:persona.nombre},callback);
}

export const registrarListener=(fn)=>{
    if(!global.registarListenerPersonas){
     listaPersonas=[]
     global.registarListenerPersonas=true;

     refPersonas.on('child_added',(snap)=>{
        console.log('agrega elemento ',snap);
    
        listaPersonas.push(snap.val());
        
        fn(listaPersonas);
    });

    refPersonas.on('child_changed',(snap)=>{
        console.log('cambia '+snap.val().nombre);
        let i = buscar(snap.val().id);
        listaPersonas[i]=snap.val();
        fn(listaPersonas);
    });

    refPersonas.on('child_removed',(snap)=>{
        let i = buscar(snap.val().id);
        console.log('posicion '+i);
        listaPersonas.splice( i, 1 );
       console.log('borrado '+snap.val().id);
       fn(listaPersonas);
   });

}

 
    
  
}
buscar=(id)=>{
    let posicion=-1
    let iteracion=0
    listaPersonas.forEach(element => {
        if(element.id==id){
            posicion=iteracion
        }
        iteracion++
    });
    return posicion;
}