import { AutocompletePageModule } from './../modal/autocomplete/autocomplete.module';
import { AutocompletePage } from './../modal/autocomplete/autocomplete.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { GoogleMaps } from '@ionic-native/google-maps/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { NgxQRCodeModule } from 'ngx-qrcode2';

import { HomePage } from './home.page';
import { Routes, RouterModule } from '@angular/router';
import { ModalFiltrosPage } from '../modal-filtros/modal-filtros.page';
import { ModalFiltrosPageModule } from '../modal-filtros/modal-filtros.module';

@NgModule({
  entryComponents:[
    ModalFiltrosPage,
    AutocompletePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ModalFiltrosPageModule,
    AutocompletePageModule
  ],
  providers:[
    GoogleMaps,
    Geolocation
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
