import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanzamientosPage } from './lanzamientos.page';

const routes: Routes = [
  {
    path: '',
    component: LanzamientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanzamientosPageRoutingModule {}
