import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanzamientosPageRoutingModule } from './lanzamientos-routing.module';

import { LanzamientosPage } from './lanzamientos.page';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanzamientosPageRoutingModule
  ],
  providers:[HTTP],
  declarations: [LanzamientosPage]
})
export class LanzamientosPageModule {}
