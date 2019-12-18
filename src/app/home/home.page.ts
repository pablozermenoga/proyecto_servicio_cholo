//importamos dependencias
import { AutocompletePage } from './../modal/autocomplete/autocomplete.page';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { GoogleMap,GoogleMaps,GoogleMapOptions,GoogleMapsEvent } from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx'
import { HttpClient } from '@angular/common/http'
import { Storage } from "@ionic/storage"
import { Router, Params, Routes } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFiltrosPage } from '../modal-filtros/modal-filtros.page';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { empty } from 'rxjs';



//se declara una constante para trabajar con las opciones del mapa de google
declare const google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef; //obtiene el elemento del html llamado map
  map: any; //contendra al mapa

  markers: any=[]; // arreglo de los marcadores de las escuelas
  query: String='';
  
  scannedCode = null; // informacion del codigo que escanea el lector de qr

  // filtros por defecto se muestran todas las escuelas
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
    private nativeGeocoder: NativeGeocoder,
    private zone: NgZone
    ) {
      //se obtiene la posicion actual del dispositivo
      this.geolocation.getCurrentPosition().then((resp)=>{
        //carga el mapa en la posicion actual
        this.loadMap(resp.coords.latitude,resp.coords.longitude);
      }).catch((error)=>{
  
      });  

    }

    //metodo para cargar el mapa
    async loadMap(latitud, longitud){
      let pos = { lat: latitud, lng: longitud } // variable con formato necesario para el mapa
      var mapa = new google.maps.Map(this.mapElement.nativeElement,{ // se carga el mapa con las opciones especificadas
        zoom: 16,
          center: pos,
          mapTypeId: 'roadmap'
      });
  
      
      
       //obtiene las instituciones
       this.getInstituciones(mapa);

     
      // asigna el mapa a la variable global
      this.map = mapa;

      
    }

    ionViewDidEnter(){
     
    }

    // metodo para obtener las instituciones
    async getInstituciones(mapa){
       // mediante peticion get obtenemos las instituciones del sistema web
        this.httpClient.get('https://signayarit.herokuapp.com/SigApp/SigMovilFiltros/MEDIA-SUPERIOR/SUPERIOR/PRIVADO/PUBLICO/' , {
        }).subscribe((data:string) => {
          data = data.replace('\\',''); // se formatea la informacion para poder trabajarla
          let info = JSON.parse(data); // se transforma la informacion a JSON

          // recorre el JSON
          for(let i in info){
            // se le da formato a la posicion para poder utilizarla
            let position ={lat:Number(info[i].fields['Latitud']),lng:Number(info[i].fields['Longitud'])};
            // se agrega el marcador de la institucion
            this.addMarkers(position,this.map,info[i].pk,info[i].fields["NombreEscuela"]);
          }

          
        });
    }
  
    // metodo para agregar los marcadores de las instituciones necesita la posicion la referencia al mapa
    // el identificador y el nombre de la institucion
    addMarkers(pos,map,id,name){

      // se agrega a el arreglo el marcador correspondiente
     this.markers.push(new google.maps.Marker({
        position: pos, // se le asigna la posicion
        map: map, // se relaciona el mapa
        title: name, // nombre que aparecera al poner el cursor sobre el
        icon: {
                url:'../assets/icon/university.png', // icono que se mostrara en el mapa
                scaledSize:new google.maps.Size(30, 30), // tamaño del icono
              },
        id: id, // identificador
      })
      );
      
      this.markers[this.markers.length-1].addListener('click',(event)=>{ // agrega el evento para abrir la institucion
        this.navigateto(id);
      });
    }

    // metodo para abrir institucion en nueva ventana
    navigateto(id){
      // se envia el identificador a la memoria cache
      this.storage.set("id",id); 
      // llama a la ventana info
      this.router.navigate(['/info']);
      // se envia a la cache la info de que se mando a llamar desde home(1) y no desde busqueda(2)
      this.storage.set("ventana",1);
    }

    // metodo para escanear el codigo qr
    scanCode() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text; 
        this.storage.set("id",barcodeData.text); // se envia el identificador obtenido del escaneo a la cache
        this.storage.set("ventana",1); // se envia a la cache la info de que se mando a llamar desde home(1) y no desde busqueda(2)
        this.router.navigate(['/info']);      // llama a la ventana info
  
    });
  }


  //VetanaModal funcion para abrir modal 
  async abrirModal(){
    
    // creacion de la variable que contendra a la modal
    const modal =  await this.modalCtrl.create({
      component:ModalFiltrosPage, // se asigna al componente a llamar
      componentProps: { // se envian las propiedades de los filtros
    'media': this.media, 
    'mediasuperior': this.mediasuperior,
    'superior': this.superior,
    'publica': this.publica,
    'privada':this.privada
      }
    });  
    await modal.present(); // activa la modal
    const { data } = await modal.onDidDismiss(); // espera a que termine
    // se da formato a los filtros
    let ms = (data.mediasuperior == false) ? "empty":"MEDIA-SUPERIOR";
    let s = (data.superior == false) ? "empty":"SUPERIOR";
    let pr = (data.privada == false) ? "empty":"PRIVADA";
    let pu = (data.publica == false) ? "empty":"PUBLICA";
    // se asignan los valores a los filtros
    this.filtros(data.media,data.mediasuperior,data.superior,data.publica,data.privada);
    // se ejecuta el get de las instituciones con los nuevos filtros
    this.httpClient.get('https://signayarit.herokuapp.com/SigApp/SigMovilFiltros/'+ms+'/'+s+'/'+pr+'/'+pu ,{
    }).subscribe((data:any) => {
      data = data.replace('\\',''); // se formatea la informacion para poder trabajarla
      var info = JSON.parse(data); // se transforma la informacion a JSON
      for(let i in info){  // recorre el JSON
        // se le da formato a la posicion para poder utilizarla
        let position ={lat:Number(info[i].fields['Latitud']),lng:Number(info[i].fields['Longitud'])};
        // se agrega el marcador de la institucion
         this.addMarkers(position,this.map,info[i].pk,info[i].fields["NombreEscuela"]);
      }
    });
  }


  // metodo para asignar filtros
  filtros(m,ms,s,pu,pr){
    this.media = m;
    this.mediasuperior = ms;
    this.superior = s;
    this.publica = pu;
    this.privada = pr;

    // limpia las pociciones de los marcadores para que desaparescan del mapa
    this.markers.forEach(element => {
      element.setMap(null); 
    });

    // se limpia el arreglo de los marcadores para la reasignacion de con los filtros correspondientes
    this.markers = [];
  }

  // metodo para que te envie a un lugar especifico en el mapa
  changeCenter(){
    let geocoder = new google.maps.Geocoder(); // geocoder es para decodificar direcciones y pasarlas a posiciones
    let mapa = this.map;
    let pos = '';

    geocoder.geocode({'address': this.query},function(results,status){ // la variable query contiene la direccion buscada
      if(status === 'OK'){ // si el estatus es OK entonces quiere decir que si existe la direccion    
        pos = results[0].geometry.location; // se obtiene la posicion
        mapa.setCenter(results[0].geometry.location); // cambia al la ubicacion seleccionada
        mapa.setZoom(16);
      }
    });
  }


  // modal autocomplete para las direcciones
  async abrirAutoComplete(){
    
    const modal =  await this.modalCtrl.create({ //se crea la modal
      component:AutocompletePage,
    });  
    await modal.present();
    const { data } = await modal.onDidDismiss(); // espera a que cierre
    this.query = data.lugar; // se obtiene el lugar
        if(this.query != null){
          this.changeCenter(); // se cambia el mapa a la ubicacion
        }
  }

   async delay(ms: number) { // metodo para realizar una pausa recibe la cantidad en milisegundos
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  busquedaNombre(){
    // abrir ventana busqueda institucion
    this.router.navigate(['/busqueda-isntitucion']);
  }
}