import { Component, OnInit } from '@angular/core';
import { SpaceServiceService } from '../space-service.service';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IUsuario } from '../interfaces';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from "firebase/app";
import "firebase/auth";
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
  path: String;
  ImagenUsuario: any

  constructor(public alertController: AlertController, private _productoService: SpaceServiceService, public router: Router, public spaceServiceService: SpaceServiceService, private angularfirestorage: AngularFireStorage) {
    this.provSer = spaceServiceService
  }

  ngOnInit() {
    let refUsuario = this._productoService.getUsuarios();
    this.UsuarioIniciado = this.provSer.getUser();
    refUsuario.once("value", snapshot => {
      snapshot.forEach(child => {
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
    this.getUserImage();
  }
  onLogout() {
    firebase.auth().signOut();
    this.router.navigate(['/login'])
  }

  uploadImage() {
    console.log(this.path);
    this.angularfirestorage.upload("/UserAvatar/" + this.UsuarioIniciado, this.path);
    this.getUserImage2();
    // location.reload();
  }

  upload($event) {
    this.path = $event.target.files[0];
    this.uploadImage();
  }

  getUserImage2() {
    this.angularfirestorage.ref("/UserAvatar").listAll().forEach(img => {
      console.log(img.items.length);
      for (let i = 0; i < img.items.length; i++) {
        if (img.items[i].fullPath == "UserAvatar/" + this.UsuarioIniciado) {
          this.angularfirestorage.ref('/UserAvatar/' + this.UsuarioIniciado).getDownloadURL().subscribe(imgUrl => {
            alert("entras")
            setTimeout(() => {
              this.provSer.setUserImage(imgUrl);
              this.ImagenUsuario = this.provSer.getUserImage();
            }, 5000);

          });
        }
        else {
          (document.getElementById('avatar') as HTMLImageElement).src = 'https://www.divigear.com/wp-content/uploads/2020/08/Divi-Carousel-Module-coverflow.jpg';
        }
      }
    })
  }

  getUserImage() {
    this.angularfirestorage.ref("/UserAvatar").listAll().forEach(img => {
      console.log(img.items.length);
      for (let i = 0; i < img.items.length; i++) {
        if (img.items[i].fullPath == "UserAvatar/" + this.UsuarioIniciado) {
          this.angularfirestorage.ref('/UserAvatar/' + this.UsuarioIniciado).getDownloadURL().subscribe(imgUrl => {
            this.provSer.setUserImage(imgUrl);
            this.ImagenUsuario = this.provSer.getUserImage();
          });
        }
        else {
          this.ImagenUsuario = "../../assets/img/SpaceX_Launches_Logo_Negro.svg"
        }
      }
    })
  }
}
