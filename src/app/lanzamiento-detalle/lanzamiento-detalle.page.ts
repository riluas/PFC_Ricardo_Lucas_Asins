import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { SpaceServiceService } from '../space-service.service';
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
  constructor(private http: HTTP, public spaceService: SpaceServiceService) {
    this.provSer = spaceService
   }

  ngOnInit() {
    this.idLaunch = this.provSer.getLaunchId();
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

}
