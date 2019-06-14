import { Component, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap,GoogleMaps,GoogleMapOptions,GoogleMapsEvent } from '@ionic-native/google-maps/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


declare const google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  instituciones: any;/*=[
    {id:1,lat:21.486315,lng:-104.852716},
    {id:2,lat:21.483655,lng:-104.859106},
    {id:3,lat:21.483697,lng:-104.859083},
    {id:4,lat:21.484562,lng:-104.850336},
    {id:5,lat:21.485337,lng:-104.853760},
  ];*/

  markers: any=[];
  scannedCode = null;
  constructor(private googleMaps: GoogleMaps, private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation) {
      this.geolocation.getCurrentPosition().then((resp)=>{
        this.loadMap(resp.coords.latitude,resp.coords.longitude);
      }).catch((error)=>{
  
      });  
    }

    loadMap(latitud, longitud){
      let pos = { lat: latitud, lng: longitud }
      var mapa = new google.maps.Map(this.mapElement.nativeElement,{
        zoom: 14,
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

      this.instituciones.forEach(element => {
        let position ={lat:element.lat,lng:element.lng};
        console.log(position);
        this.addMarkers(position,mapa,element.id);
      });
  
      this.map = mapa;
    }

    addMarkers(pos,map,id){
     this.markers.push(new google.maps.Marker({
        position: pos,
        map: map,
        title: "Hello",
        id: id
      })
      );
    }

    scanCode() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
    });
  }


}
