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
  infoLaunchpad: any;
  arrayDate: any[] = Array();
  newArrayDate: any[] = Array();
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

      this.http.get('https://api.spacexdata.com/v4/launchpads', {}, {})

      .then(res => {
        console.log(res + "HOLA");
        this.infoLaunchpad = JSON.parse(res.data);
        console.log(res.data); // Información recibida desde el server.
      })
      .catch(error => {
        console.log(error.error); // Mensaje de error en una cadena.
      });

      this.http.get('https://api.spacexdata.com/v4/launches/upcoming', {}, {})

      .then(res => {
        console.log(res + "HOLA");
        this.infoLaunches= JSON.parse(res.data);
        console.log("ESTO");
        for (const key in this.infoLaunches) {
          console.log(this.infoLaunches[key].id);
          this.arrayDate.push({ "id": this.infoLaunches[key].id, "date": this.infoLaunches[key].date_utc }) // Información recibida desde el server.
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
  countDownDate = new Date("2021-05-26T18:59:00.000Z").getTime();
  setLaunchId(id){
    this.provSer.setLaunchId(id);
  }
  demo: any
  x = setInterval(() => {
    this.newArrayDate = []
    for (const key in this.arrayDate) {
      var now = new Date().getTime();
      this.countDownDate = new Date(this.arrayDate[key].date).getTime();
      var distance = this.countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      hours = hours + 2;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.demo = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      this.newArrayDate.push({ "id": this.arrayDate[key].id, "date": this.demo })
    }
  })

}
