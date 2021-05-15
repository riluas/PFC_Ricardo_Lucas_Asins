import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from "firebase/app";
import "firebase/auth";
import { IUsuario } from '../interfaces';
import {SpaceServiceService} from '../space-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  imagenRuta: string = "../../assets/img/SpaceX_Launches_Logo_Negro.svg";

  createUsuario: IUsuario[];
  usuarios: IUsuario[] = [];
  id : number = 0;
  message = "Hola";
  provSer: SpaceServiceService;
  email: any[] = Array();
  loginEmail: string = "";
  loginPassword: string = "";

  constructor(public alertController: AlertController,   private _productoService : SpaceServiceService,public router: Router, public spaceServiceService: SpaceServiceService) {
    this.provSer = spaceServiceService
  }

ngOnInit(){
  let ref = this._productoService.getUsuarios();
  ref.once("value", snapshot =>{
    snapshot.forEach(child =>{
      let value = child.val();
      this.usuarios.push(value);
      this.email.push(value.nombre); 
      console.log("He encontrado "+child.val().id);
      this.id++
      console.log(this.id);
      
    })
       
  });
  
}

create(){
  this.router.navigate(['/registro'])
}

login(){
  firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
  .then((user) => {
    // Signed in
    // ...
    alert("Correcto")
    this.provSer.setUser(this.loginEmail);    
    this.router.navigate(['/lanzamientos'])
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (this.loginEmail == "") {
      console.log(this.email);
      alert("Introduce el email")
    }
    if (this.loginPassword == "") {
      alert("Introduce la contraseña")
    }
    else{
      alert("Email o contraseña erroneos")
    }
 
  });
}

guest(){
  firebase.auth().signInWithEmailAndPassword("guest@spacexlaunches.com", "123456")
  .then((user) => {
    alert("Correcto")
    this.provSer.setUser("guest@spacexlaunches.com");    
    this.router.navigate(['/lanzamientos'])
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (this.loginEmail == "") {
      console.log(this.email);
      alert("Introduce el email")
    }
    if (this.loginPassword == "") {
      alert("Introduce la contraseña")
    }
    else{
      alert("Email o contraseña erroneos")
    }
 
  });
}

}
