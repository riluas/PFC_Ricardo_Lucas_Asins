import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanzamientoDetallePageRoutingModule } from './lanzamiento-detalle-routing.module';

import { LanzamientoDetallePage } from './lanzamiento-detalle.page';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanzamientoDetallePageRoutingModule
  ],
  providers:[HTTP],
  declarations: [LanzamientoDetallePage]
})
export class LanzamientoDetallePageModule {}
