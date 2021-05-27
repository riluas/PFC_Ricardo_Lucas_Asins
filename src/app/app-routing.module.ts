import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NologinGuard } from "./guards/nologin.guard"

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
    path: 'vehiculos',canActivate: [AuthGuard],
    loadChildren: () => import('./vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'lanzamientos',canActivate: [AuthGuard],
    loadChildren: () => import('./lanzamientos/lanzamientos.module').then( m => m.LanzamientosPageModule)
  },
  {
    path: 'seguidos',canActivate: [AuthGuard],
    loadChildren: () => import('./seguidos/seguidos.module').then( m => m.SeguidosPageModule)
  },
  {
    path: 'perfil',canActivate: [AuthGuard],
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'lanzamiento-detalle/:id',canActivate: [AuthGuard],
    loadChildren: () => import('./lanzamiento-detalle/lanzamiento-detalle.module').then( m => m.LanzamientoDetallePageModule)
  },
  {
    path: 'vehiculo-detalle/:id',canActivate: [AuthGuard],
    loadChildren: () => import('./vehiculo-detalle/vehiculo-detalle.module').then( m => m.VehiculoDetallePageModule)
  },
  {
    path: 'login',canActivate: [NologinGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',canActivate: [NologinGuard],
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
