//dependencias necesarias para que la ventana funcione correctamente
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.page.html',
  styleUrls: ['./acercade.page.scss'],
})
export class AcercadePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  //metodo para regresar a la ventana principal de la aplicacion
  cancelar(){
    this.router.navigate(["/home"]);
  }

}
