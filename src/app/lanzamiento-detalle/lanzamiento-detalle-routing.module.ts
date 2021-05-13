import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanzamientoDetallePage } from './lanzamiento-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: LanzamientoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanzamientoDetallePageRoutingModule {}
