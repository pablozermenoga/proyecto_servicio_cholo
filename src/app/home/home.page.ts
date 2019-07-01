import { AutocompletePage } from './../modal/autocomplete/autocomplete.page';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap,GoogleMaps,GoogleMapOptions,GoogleMapsEvent } from '@ionic-native/google-maps/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx'
import { HttpClient } from '@angular/common/http'
import { Storage } from "@ionic/storage"
import { Router, Params, Routes } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFiltrosPage } from '../modal-filtros/modal-filtros.page';



declare const google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  markers: any=[];
  query: String='';
  
  scannedCode = null;

  media: boolean=true;
  mediasuperior: boolean=true;
  superior: boolean=true;
  publica: boolean=true;
  privada: boolean=true;

  

  constructor(private googleMaps: GoogleMaps,
     private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation,
    private http: HTTP, 
    private httpClient:HttpClient,
    private storage: Storage, 
    private router:Router,
    private modalCtrl:ModalController,
    ) {
      this.geolocation.getCurrentPosition().then((resp)=>{
        this.loadMap(resp.coords.latitude,resp.coords.longitude);
      }).catch((error)=>{
  
      });  

    }

    loadMap(latitud, longitud){
      let pos = { lat: latitud, lng: longitud }
      var mapa = new google.maps.Map(this.mapElement.nativeElement,{
        zoom: 16,
          center: pos,
          mapTypeId: 'roadmap'
      });
  
    
      /*var marker = new google.maps.Marker({
        position: pos,
        map: mapa,
        title: "Hello"
      });
  
      mapa.addListener('click',function(opc){
          marker.setPosition(opc.latLng);
      });
  
      marker.addListener("click",function(){
        
      });*/

        this.httpClient.get('http://sigmovil.herokuapp.com/getescuelas', {
        }).subscribe(data => {
          for(let i in data){
            let position ={lat:Number(data[i].lat),lng:Number(data[i].lng)};
        //console.log(position);
        this.addMarkers(position,mapa,data[i].id);
            //console.log(data[i].lat);
          }
          
        });

      /*this.instituciones.forEach(element => {
        let position ={lat:element.lat,lng:element.lng};
        //console.log(position);
        this.addMarkers(position,mapa,element.id);
      });*/
  
      this.map = mapa;

      
    }

    ionViewDidEnter(){
     
    }
  
    addMarkers(pos,map,id){
     this.markers.push(new google.maps.Marker({
        position: pos,
        map: map,
        title: "Hello",
       
        id: id,
      })
      );
      this.markers[this.markers.length-1].addListener('click',(event)=>{
        this.navigateto(id);
      });
    }

    navigateto(id){
      this.storage.set("id",id);
        this.router.navigate(['/info']);
    }

    scanCode() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.storage.set("id",barcodeData.text);
        this.router.navigate(['/info']);
    });
  }


  //VetanaModal funcion para abrir modal 
  async abrirModal(){
    
    const modal =  await this.modalCtrl.create({
      component:ModalFiltrosPage,
      componentProps: {
    'media': this.media,
    'mediasuperior': this.mediasuperior,
    'superior': this.superior,
    'publica': this.publica,
    'privada':this.privada
      }
    });  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.filtros(data.media,data.mediasuperior,data.superior,data.publica,data.privada);
    this.httpClient.get('http://sigmovil.herokuapp.com/filtroescuelas', {
      params:{
        'media': data.media,
        'mediasuperior': data.mediasuperior,
        'superior': data.superior,
        'publica': data.publica,
        'privada':data.privada
      }
    }).subscribe(data => {
      for(let i in data){
        let position ={lat:Number(data[i].lat),lng:Number(data[i].lng)};
    //console.log(position);
    this.addMarkers(position,this.map,data[i].id);
        //console.log(data[i].lat);
      }
    },error=>{
      alert(error);
    });


    console.log(data.primaria);
  }


  filtros(m,ms,s,pu,pr){
    this.media = m;
    this.mediasuperior = ms;
    this.superior = s;
    this.publica = pu;
    this.privada = pr;

    this.markers.forEach(element => {
      element.setMap(null);
    });

    this.markers = [];
  }

  changeCenter(){
    let geocoder = new google.maps.Geocoder();
    let mapa = this.map;

    geocoder.geocode({'address': this.query},function(results,status){
      if(status === 'OK'){        
        mapa.setCenter(results[0].geometry.location);
        mapa.setZoom(16);
      }
    });
  }


  async abrirAutoComplete(){
    
    const modal =  await this.modalCtrl.create({
      component:AutocompletePage,
      componentProps: {
    'media': this.media,
    'mediasuperior': this.mediasuperior,
    'superior': this.superior,
    'publica': this.publica,
    'privada':this.privada
      }
    });  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.query = data.lugar;
        if(this.query != null){
          this.changeCenter();
        }
    /*this.filtros(data.media,data.mediasuperior,data.superior,data.publica,data.privada);
    this.httpClient.get('http://sigmovil.herokuapp.com/filtroescuelas', {
      params:{
        'media': data.media,
        'mediasuperior': data.mediasuperior,
        'superior': data.superior,
        'publica': data.publica,
        'privada':data.privada
      }
    }).subscribe(data => {
      for(let i in data){
        let position ={lat:Number(data[i].lat),lng:Number(data[i].lng)};
    //console.log(position);
    this.addMarkers(position,this.map,data[i].id);
        //console.log(data[i].lat);
      }
    });


    console.log(data.primaria);*/
  }
}