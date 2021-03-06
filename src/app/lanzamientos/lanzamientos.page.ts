import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { SpaceServiceService } from '../space-service.service';
@Component({
  selector: 'app-lanzamientos',
  templateUrl: './lanzamientos.page.html',
  styleUrls: ['./lanzamientos.page.scss'],
})

export class LanzamientosPage implements OnInit {

  infoLaunches: any;
  infoRocket: any;
  provSer: SpaceServiceService;

  constructor(private http: HTTP, public spaceService: SpaceServiceService) {
    this.provSer = spaceService
   }
  
  ngOnInit() {
    
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
    
  }
  conutDownDate = new Date("2021-05-26T18:59:00.000Z").getTime();
  setLaunchId(id){
    this.provSer.setLaunchId(id);
  }

  demo:any
  x = setInterval(()=>{
      var now = new Date().getTime();
      var distance = this.conutDownDate - now;
      var days = Math.floor(distance/(1000*60*60*24));
      var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        hours = hours+2;
      var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
      var seconds = Math.floor((distance % (1000*60)) / 1000);
      this.demo = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  })
}


