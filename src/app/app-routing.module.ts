import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'vehiculos',
    loadChildren: () => import('./vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'lanzamientos',
    loadChildren: () => import('./lanzamientos/lanzamientos.module').then( m => m.LanzamientosPageModule)
  },
  {
    path: 'seguidos',
    loadChildren: () => import('./seguidos/seguidos.module').then( m => m.SeguidosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'lanzamiento-detalle/:id',
    loadChildren: () => import('./lanzamiento-detalle/lanzamiento-detalle.module').then( m => m.LanzamientoDetallePageModule)
  },
  {
    path: 'vehiculo-detalle/:id',
    loadChildren: () => import('./vehiculo-detalle/vehiculo-detalle.module').then( m => m.VehiculoDetallePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
