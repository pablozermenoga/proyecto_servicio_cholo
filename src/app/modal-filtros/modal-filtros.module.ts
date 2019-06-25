import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

//Importacion modall
import { ModalFiltrosPage } from './modal-filtros.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalFiltrosPage]
})
export class ModalFiltrosPageModule {}
