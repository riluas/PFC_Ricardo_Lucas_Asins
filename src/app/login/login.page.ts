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

  ruta: string = "../../assets/img/FLORIDA-UNIVERSITARIA.png";

  createUsuario: IUsuario[];
  usuarios: IUsuario[] = [];
  id : number = 0;
  message = "Hola";
  provSer: SpaceServiceService;
  usuario: any[] = Array();
  loginUser: string = "";
  loginPassword: string = "";

  constructor(public alertController: AlertController,   private _productoService : SpaceServiceService,public router: Router, public serviceProviderService: SpaceServiceService) {
    this.provSer = serviceProviderService
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

create(){
  this.router.navigate(['/registro'])
}

btnClicked(){
  firebase.auth().signInWithEmailAndPassword(this.loginUser, this.loginPassword)
  .then((user) => {
    // Signed in
    // ...
    alert("Correcto")
    this.provSer.setUser(this.loginUser);    
    this.router.navigate(['/home'])
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (this.loginUser == "") {
      console.log(this.usuario);
      alert("Introduce el nombre de usuario")
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
