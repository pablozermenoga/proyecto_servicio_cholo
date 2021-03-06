import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx'
import { HttpClientModule } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  NgxQRCodeModule, FormsModule,
  HttpClientModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    NativeGeocoder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
