import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { SpaceServiceService } from '../space-service.service';

@Component({
  selector: 'app-vehiculo-detalle',
  templateUrl: './vehiculo-detalle.page.html',
  styleUrls: ['./vehiculo-detalle.page.scss'],
})
export class VehiculoDetallePage implements OnInit {

  data: any;
  provSer: SpaceServiceService;
  idRocket: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor(private http: HTTP, public spaceService: SpaceServiceService) {
    this.provSer = spaceService
  }

  ngOnInit() {
    this.idRocket = this.provSer.getRocketId();
    this.http.get('https://api.spacexdata.com/v4/rockets', {}, {})

      .then(res => {
        console.log(res + "HOLA");
        this.data = JSON.parse(res.data);
        console.log(res.data); // Información recibida desde el server.
        console.log(res.headers);
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // Mensaje de error en una cadena.
        console.log(error.headers);
      });
  }

}
