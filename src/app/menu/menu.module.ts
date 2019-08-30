import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children:[
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'qr', loadChildren: '../pages/qr/qr.module#QrPageModule' },
      { path: 'busqueda-isntitucion', loadChildren: '../busqueda-isntitucion/busqueda-isntitucion.module#BusquedaIsntitucionPageModule' },      { path: 'acercade', loadChildren: '../acercade/acercade.module#AcercadePageModule' }
    ]
  },
  { path: 'info', loadChildren: '../pages/info/info.module#InfoPageModule' },
  {
    path:'',
    redirectTo:'/menu/home'
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
