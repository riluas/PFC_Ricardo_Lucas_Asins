import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-lanzamientos',
  templateUrl: './lanzamientos.page.html',
  styleUrls: ['./lanzamientos.page.scss'],
})
export class LanzamientosPage implements OnInit {

  infoLaunches: any;
  infoRocket: any;

  constructor(private http: HTTP) { }
  

  getRocketById(idRocket){
    const img = idRocket
    let imgRocket
    this.http.get('https://api.spacexdata.com/v4/rockets/5e9d0d95eda69974db09d1ed', {}, {})
    .then(res => {
      // console.log("C9obete123:"+res.data.flickr_images[0]);
      this.infoRocket= JSON.parse(res.data);
      imgRocket = this.infoRocket.flickr_images[0];
      // console.log(res.data); // Información recibida desde el server.
      // console.log("Cobete: "+this.infoRocket.flickr_images[0]);
      // return this.infoRocket.flickr_images[0];
      console.log(imgRocket);
      
    })
    .catch(error => {
      console.log(error.error); // Mensaje de error en una cadena.
    });
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

}


