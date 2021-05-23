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
  existe = false;
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

    let ref2 = this.provSer.getFavoritos();
    ref2.orderByChild("usuario").equalTo(this.UsuarioIniciado).once("value", snapshot => {
    snapshot.forEach(child => {
      console.log(child.key+": "+child.val());
      console.log(child.val().idLanzamiento);
      if (child.val().idLanzamiento == this.idLaunch && child.val().usuario == this.UsuarioIniciado) {
          this.existe = true
      }
    })
    });

  }
  

  setLaunchId(idLanzamiento){
    this.favoritos = [];
    let ref = this.provSer.getFavoritos();
    ref.once("value", snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val();
        this.favoritos.push(value);
        console.log("Favoritos "+this.favoritos);
        console.log("He encontrado "+child.val().idLanzamiento);
      })
    });
//No entra al for
console.log(this.favoritos.length);
    for (let i = 0; i < this.favoritos.length; i++) {
      console.log(this.favoritos[i]);
      if (this.favoritos[i].usuario == this.UsuarioIniciado && this.favoritos[i].idLanzamiento == idLanzamiento && !this.existe) {
          this.existe = true
         break;
      }
      else{
        this.existe = false
      }
    }
    if(!this.existe){
        let ref = this._db.database.ref("Favoritos");
        ref.push({idLanzamiento:idLanzamiento, usuario:this.UsuarioIniciado});
        this.existe = true
    }
    else{
        // Elimina el favorito que es igual al usuario
        let ref2 = this.provSer.getFavoritos();
        ref2.orderByChild("usuario").equalTo(this.UsuarioIniciado).once("value", snapshot => {
        snapshot.forEach(child => {
          console.log(child.key+": "+child.val());
          console.log(child.val().idLanzamiento);
          if (child.val().idLanzamiento == idLanzamiento && child.val().usuario == this.UsuarioIniciado) {
              let clave = child.key;
              ref2.child(clave).remove();
          }
        })
        });
        console.log(this.UsuarioIniciado);
        this.existe = false
    }
  }
}