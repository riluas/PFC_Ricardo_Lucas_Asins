import { Component, OnInit } from '@angular/core';
import {SpaceServiceService} from '../space-service.service';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IUsuario } from '../interfaces';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  provSer: SpaceServiceService;
  UsuarioIniciado: any;
  usuarios: IUsuario[] = [];
  idUsuarioIniciado: number;
  nombreUsuarioIniciado: any;
  apellidosUsuarioIniciado: any;

  constructor(public alertController: AlertController,   private _productoService : SpaceServiceService,public router: Router, public spaceServiceService: SpaceServiceService) {
    this.provSer = spaceServiceService
  }

  ngOnInit() {
    let refUsuario = this._productoService.getUsuarios();
    this.UsuarioIniciado = this.provSer.getUser();
    refUsuario.once("value", snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val();
        this.usuarios.push(value);
      })
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].email == this.UsuarioIniciado) {
            this.idUsuarioIniciado = this.usuarios[i].id;
            this.nombreUsuarioIniciado = this.usuarios[i].nombre;
            this.apellidosUsuarioIniciado = this.usuarios[i].apellidos;
        }
        
      }

    });
  }

}
