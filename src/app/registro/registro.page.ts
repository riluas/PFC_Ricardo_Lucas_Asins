import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { IUsuario, IUsuarioCreate } from '../interfaces';
import {SpaceServiceService} from '../space-service.service'
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  ruta: string = "../../assets/img/FLORIDA-UNIVERSITARIA.png";
  createUsuario: IUsuarioCreate[];
  usuarios: IUsuario[] = [];
  id : number = 0;
  provSer: SpaceServiceService;
  usuario: any[] = Array();
  loginEmail: string = "";
  NombreUser: string = "";
  ApellidosUser: string;
  loginPassword: string = "";
  

 
  constructor(public alertController: AlertController,   private _productoService : SpaceServiceService,public router: Router, public spaceServiceService: SpaceServiceService,private navCtrl:NavController) {
    this.provSer = spaceServiceService
  }

  ngOnInit(){
    let ref = this._productoService.getUsuarios();
    ref.once("value", snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val();
        this.usuarios.push(value);
        this.usuario.push(value.nombre); 
        console.log("He encontrado "+child.val().id);
        this.id++
        console.log(this.id);
        
      })
         
    });
    
  }
  goback() {
    this.navCtrl.pop();
   
 }

  create(){
    firebase.auth().createUserWithEmailAndPassword(this.loginEmail, this.loginPassword)
    .then((user) => {
      // Signed in
      // ...
      alert("Usuario "+ this.loginEmail + " creado correctamente")
      this.provSer.setUser(this.loginEmail);
      this.id++
      let createUsuario: IUsuarioCreate={
        "id": this.id,
        "nombre": this.NombreUser,
        "apellidos": this.ApellidosUser,
        "email": this.loginEmail,
      };
      this._productoService.setUsuarios(createUsuario);
      this.router.navigate(['/lanzamientos'])
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (this.loginEmail == "") {
        console.log(this.usuario);
        alert("Introduce un email")
      }
      if (this.loginPassword == "") {
        alert("Introduce una contraseña")
      }else{
        alert("Usuario "+ this.loginEmail + " ya existe")
      }
      
    });
  }

}
