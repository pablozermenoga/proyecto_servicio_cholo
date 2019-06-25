import { Component, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap,GoogleMaps,GoogleMapOptions,GoogleMapsEvent } from '@ionic-native/google-maps/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx'
import { HttpClient } from '@angular/common/http'
import { Storage } from "@ionic/storage"
import { Router, Params, Routes } from '@angular/router';


declare const google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  instituciones: any=[
    {id:1,lat:21.486315,lng:-104.852716},
    {id:2,lat:21.483655,lng:-104.859106},
    {id:3,lat:21.483697,lng:-104.859083},
    {id:4,lat:21.484562,lng:-104.850336},
    {id:5,lat:21.485337,lng:-104.853760},
  ];

  markers: any=[];
  query: String='';
  
  scannedCode = null;
  constructor(private googleMaps: GoogleMaps, private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation,private http: HTTP, private httpClient:HttpClient,
    private storage: Storage, private router:Router) {

      
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
  
    
      var marker = new google.maps.Marker({
        position: pos,
        map: mapa,
        title: "Hello"
      });
  
      mapa.addListener('click',function(opc){
          marker.setPosition(opc.latLng);
      });
  
      marker.addListener("click",function(){
        
      });

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
      this.storage.get('lugar').then(element => {
        this.query = element;
        if(this.query != '' && this.query != 'undefinied'){
          this.changeCenter();
        }
        this.storage.set('lugar', null);
      });
     
    }
  
    addMarkers(pos,map,id){
     this.markers.push(new google.maps.Marker({
        position: pos,
        map: map,
        title: "Hello",
        id: id
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

  localizar(){
    /*let geocoder = new google.maps.Geocoder();
    let mapa = this.map;

    geocoder.geocode({'address': this.query},function(results,status){
      if(status === 'OK'){        
        mapa.setCenter(results[0].geometry.location);

        results.forEach(element => {
          console.log(element.formatted_address)
        });
      }
    });*/
    
    this.router.navigate(['/autocomplete'], { skipLocationChange: true });
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

}