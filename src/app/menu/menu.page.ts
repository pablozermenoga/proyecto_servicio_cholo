import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
//menu lateral
export class MenuPage implements OnInit {

  //rutas para las vistas del menu
  pages=[
    {
      title:'Mapa',
      url:'/menu/home',
      icon:'pin'
    },
    /*{
      title:'Buscar por código QR',
      url:'/menu/qr',
      icon:'qr-scanner'
    },*/
    {
      title:'Buscar institución',
      url:'/menu/busqueda-isntitucion',
      icon:'search'
    },
    {
      title:'Acerca de',
      url:'/menu/acercade',
      icon:'help'
    }
  ];

  selectedPath='';
 
  constructor(private router: Router) 
  { 
    this.router.events.subscribe((event: RouterEvent) => {
     this.selectedPath=event.url;
    });
  }

  ngOnInit() {
  }

}
