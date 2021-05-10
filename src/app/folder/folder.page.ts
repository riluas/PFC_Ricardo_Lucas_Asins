import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  data: any;
  contact: Array<Object>;
  url: any;

  constructor(private activatedRoute: ActivatedRoute,private http: HTTP) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
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
