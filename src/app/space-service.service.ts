import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { IUsuario } from './interfaces';
@Injectable({
  providedIn: 'root'
})
export class SpaceServiceService {

  user: any;
  usuarios: IUsuario[] = []
  idLaunch: any;
  idRocket: any;
  imgUrl: any;
  init: any;

  constructor(private _db: AngularFireDatabase) { }

  getUserImage() {
    return this.imgUrl;
  }
  setUserImage(imgUrl: string) {
    this.imgUrl = imgUrl;
  }

  getUser() {
    return this.user
  }
  setUser(user: string) {
    this.user = user
  }

  getUsuarios(): firebase.default.database.Reference {
    let ref = this._db.database.ref("Usuarios");
    return ref;
  }
  setUsuarios(usuarios: IUsuario) {
    let ref = this._db.database.ref("Usuarios");
    ref.push(usuarios);
  }

  getFavoritos(): firebase.default.database.Reference {
    let ref = this._db.database.ref("Favoritos");
    return ref;
  }

  setLaunchId(id) {
    this.idLaunch = id;
  }
  getLaunchId() {
    return this.idLaunch;
  }

  setRocketId(id) {
    this.idRocket = id;
  }
  getRocketId() {
    return this.idRocket;
  }

}


