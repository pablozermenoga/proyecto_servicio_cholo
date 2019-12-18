import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { GoogleMap,GoogleMaps,GoogleMapOptions,GoogleMapsEvent } from '@ionic-native/google-maps/ngx'
import { Storage } from '@ionic/storage'



declare var google;
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.page.html',
  styleUrls: ['./autocomplete.page.scss'],
})
export class AutocompletePage implements OnInit {

  query: String; // contiene el texto de la direccion
  list: any = []; // contiene la coincidencias de la busqueda
  constructor(private cdr: ChangeDetectorRef, private storage: Storage, private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async localizar(){

   
    let geocoder = new google.maps.Geocoder(); // geocoder direccion a pocicion
    let l = []; // lista temporal
    geocoder.geocode({'address': this.query},function(results,status){ // realiza la busqueda de la direccion
      if(status === 'OK'){ // si encuentra coincidencias
        this.list = []; // inicializa la lista
        results.forEach(element => { //recorre los resultados
          l.push(element.formatted_address); // los asigna a la lista temporal
        });
        
      }
    });
    this.list = l; // vacia la lista temporal en la lista
    this.cdr.detectChanges(); // para detectar cambios
  }

  // pasa el resultado a la ventana anterior y cierra la modal
  evento(item){

    this.modalCtrl.dismiss({
      "lugar":item
    });
  }

  // pasa un null a la ventana anterior y cierra la modal
  cancelar(){
    this.modalCtrl.dismiss({
      "lugar":null
    });
  }
}
