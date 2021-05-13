import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculoDetallePageRoutingModule } from './vehiculo-detalle-routing.module';

import { VehiculoDetallePage } from './vehiculo-detalle.page';
import { HTTP } from '@ionic-native/http/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculoDetallePageRoutingModule
  ],
  providers:[HTTP],
  declarations: [VehiculoDetallePage]
})
export class VehiculoDetallePageModule {}
