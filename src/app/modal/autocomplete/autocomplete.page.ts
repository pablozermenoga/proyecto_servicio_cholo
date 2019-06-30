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

  query: String;
  list: any = [];
  constructor(private cdr: ChangeDetectorRef, private storage: Storage, private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async localizar(){

   
    let geocoder = new google.maps.Geocoder();
    let l = [];
    console.log(this.query);
    geocoder.geocode({'address': this.query},function(results,status){
      if(status === 'OK'){        
        this.list = [];
        results.forEach(element => {
          element.geometry.lat;
          l.push(element.formatted_address);
        });
        
      }
    });
    this.list = l;
    this.cdr.detectChanges();
  }

  evento(item){

    this.modalCtrl.dismiss({
      "lugar":item
    });
  }
}
