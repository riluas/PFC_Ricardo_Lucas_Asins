import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpaceServiceService {
  idLaunch: any;
  idRocket: any;

  constructor() { }

  setLaunchId(id){
    this.idLaunch = id;
  }
  getLaunchId(){
    return this.idLaunch;
  }


  setRocketId(id){
    this.idRocket = id;
  }
  getRocketId(){
    return this.idRocket;
  }

}


