import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BusquedaIsntitucionPage } from './busqueda-isntitucion.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaIsntitucionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BusquedaIsntitucionPage]
})
export class BusquedaIsntitucionPageModule {}
