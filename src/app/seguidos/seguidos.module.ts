import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguidosPageRoutingModule } from './seguidos-routing.module';

import { SeguidosPage } from './seguidos.page';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguidosPageRoutingModule
  ],
  providers:[HTTP],
  declarations: [SeguidosPage]
})
export class SeguidosPageModule {}
