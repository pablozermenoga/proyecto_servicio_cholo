import { Component, OnInit, Input } from '@angular/core';
//importacion del modal 
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-filtros',
  templateUrl: './modal-filtros.page.html',
  styleUrls: ['./modal-filtros.page.scss'],
})
export class ModalFiltrosPage implements OnInit {

  @Input() media: boolean;
  @Input() mediasuperior: boolean;
  @Input() superior: boolean;
  @Input() publica: boolean;
  @Input() privada: boolean;

//mandar llamar al modal en el contructor
  constructor(private modalCtrl: ModalController) {
  }


  ngOnInit() {
  }
  //funcion para salir de la ventana modal 
  Salir(){
    this.modalCtrl.dismiss({
    'media': this.media,
    'mediasuperior': this.mediasuperior,
    'superior': this.superior,
    'publica': this.publica,
    'privada':this.privada
    });
  }

}
