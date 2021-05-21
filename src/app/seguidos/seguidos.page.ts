import { Component, OnInit } from '@angular/core';
import { SpaceServiceService } from '../space-service.service';
import { AngularFireDatabase } from "@angular/fire/database";
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-seguidos',
  templateUrl: './seguidos.page.html',
  styleUrls: ['./seguidos.page.scss'],
})
export class SeguidosPage implements OnInit {

  provSer: SpaceServiceService;
  favoritos: any;
  UsuarioIniciado: any;
  arrayFavoritos:any[] = Array();
  infoLaunches: any;
  infoRocket: any;
  constructor(private _productoService : SpaceServiceService,public spaceService: SpaceServiceService,private http: HTTP) {
    this.provSer = spaceService
  }

  ngOnInit() {
    let ref = this._productoService.getFavoritos();
    this.UsuarioIniciado = this.provSer.getUser();

    ref.once("value", snapshot =>{
        snapshot.forEach(child =>{
          let value = child.val();
          if (value.usuario == this.UsuarioIniciado) {
           this.arrayFavoritos.push(value.idLanzamiento)
          }          
        })
      });
      console.log(this.arrayFavoritos);

      this.http.get('https://api.spacexdata.com/v4/launches/upcoming', {}, {})

      .then(res => {
        console.log(res + "HOLA");
        this.infoLaunches= JSON.parse(res.data);
        console.log("ESTO");
        for (const key in this.infoLaunches) {
          console.log(this.infoLaunches[key].id); // Información recibida desde el server.
        }
        
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
      
  }


}
