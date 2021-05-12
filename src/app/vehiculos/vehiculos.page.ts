import { Component, OnInit } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  data: any;

  constructor(private http: HTTP) { }

  ngOnInit() {
    this.http.get('https://api.spacexdata.com/v4/rockets', {}, {})

    .then(res => {
      console.log(res + "HOLA");
      this.data= JSON.parse(res.data);
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
