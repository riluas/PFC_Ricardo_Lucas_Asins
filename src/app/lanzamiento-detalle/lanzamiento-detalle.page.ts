import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { SpaceServiceService } from '../space-service.service';
import { AngularFireDatabase } from "@angular/fire/database";
import { IFavorito } from '../interfaces';
@Component({
  selector: 'app-lanzamiento-detalle',
  templateUrl: './lanzamiento-detalle.page.html',
  styleUrls: ['./lanzamiento-detalle.page.scss'],
})
export class LanzamientoDetallePage implements OnInit {
  infoLaunches: any;
  infoRocket: any;
  idLaunch: any;
  provSer: SpaceServiceService;
  UsuarioIniciado: any;
  favoritos: IFavorito[] = [];
  arrayFavoritos:any[] = Array();
  arrayUsuariosFavoritos:any[] = Array();
  idUsuarioIniciado: number;
  constructor(private http: HTTP, public spaceService: SpaceServiceService,private _db: AngularFireDatabase) {
    this.provSer = spaceService
   }

  ngOnInit() {
    
    this.UsuarioIniciado = this.provSer.getUser(); //recojo el usuario uniciado
    this.idLaunch = this.provSer.getLaunchId(); //recojo la id de lanzamiento la cual se ha pulsado en "me gusta"
    this.http.get('https://api.spacexdata.com/v4/launches/upcoming', {}, {})

    .then(res => {
      console.log(res + "HOLA");
      this.infoLaunches= JSON.parse(res.data);
      console.log(res.data); // Información recibida desde el server.
    })
    .catch(error => {
      console.log(error.error); // Mensaje de error en una cadena.
    });

    this.http.get('https://api.spacexdata.com/v4/rockets', {}, {})

    .then(res => {
      console.log(res + "HOLA");
      this.infoRocket= JSON.parse(res.data);
      console.log(res.data); // Información recibida desde el server.
    })
    .catch(error => {
      console.log(error.error); // Mensaje de error en una cadena.
    });

    let ref = this.provSer.getFavoritos();
    ref.once("value", snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val();
        this.favoritos.push(value);
        console.log(this.favoritos);
        console.log("He encontrado "+child.val().idLanzamiento);
      })
         
    });

  }

  setLaunchId(idLanzamiento){
    let ref = this.provSer.getFavoritos();
    ref.once("value", snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val();
        this.favoritos.push(value);
        console.log(this.favoritos);
        console.log("He encontrado "+child.val().idLanzamiento);
      })
         
    });
    
    const map1 = new Map();
    let mapid
    let existe = false
    // if (condition) {
    //   // getFavoritos()
    // }
    for (let i = 0; i < this.favoritos.length; i++) {
      let usuario = this.favoritos[i].usuario;
      let launchId = this.favoritos[i].idLanzamiento;
      console.log(i);
      if (this.favoritos[i].usuario == this.UsuarioIniciado && this.favoritos[i].idLanzamiento == idLanzamiento && !existe) {
          existe = true
          break;
      }
      else{
        existe = false
      }
      // else{
      //   let ref = this._db.database.ref("Favoritos");
      //   ref.push({idLanzamiento:idLanzamiento, usuario:this.UsuarioIniciado});
      // }
      // map1.set(usuario,launchId);
      // if (this.favoritos[i].usuario == this.UsuarioIniciado) {
      //   if (idLanzamiento == this.favoritos[i].idLanzamiento) {
          
      //   }
      //   else{
      //     console.log("entra");
          
      //     let ref = this._db.database.ref("Favoritos");
      //     ref.push({idLanzamiento:idLanzamiento, usuario:this.UsuarioIniciado});
      //   }
      //   console.log("usuario: "+this.favoritos[i].usuario+" "+"idLanzamiento: "+this.favoritos[i].idLanzamiento);

      // }
      // else{
      //   let ref = this._db.database.ref("Favoritos");
      //   ref.push({idLanzamiento:idLanzamiento, usuario:this.UsuarioIniciado});
      // }

    }

    if(!existe){
        let ref = this._db.database.ref("Favoritos");
        ref.push({idLanzamiento:idLanzamiento, usuario:this.UsuarioIniciado});
    }
    else{
        // Elimina el favorito que es igual al usuario

  let ref = this.provSer.getFavoritos();
  ref.orderByChild("usuario").equalTo(this.UsuarioIniciado).once("value", snapshot => {
  snapshot.forEach(child => {
  let clave = child.key;
  ref.child(clave).remove();
  })
  });
  existe = true
    }
    
    
    console.log(map1);
    if (map1.has(this.UsuarioIniciado)) {
      console.log("lo tiene");
    }
  }

  // Elimina el favorito que es igual al usuario

  // let ref = this.provSer.getFavoritos();
  // ref.orderByChild("usuario").equalTo(this.favoritos[i].usuario).once("value", snapshot => {
  // snapshot.forEach(child => {
  // let clave = child.key;
  // ref.child(clave).remove();
  // })
  // });


}

