import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  
  nombre: String;
  subsistema: String;
  correo: String;
  domicilio: String;
  localidad: String;
  municipio: String;
  telefono: String;
  status: String;

  constructor(public httpClient: HttpClient, private storage: Storage, private router: Router) { 
    this.storage.get('id').then((item)=>{
      this.httpClient.get("http://sigmovil.herokuapp.com/getescuela/"+item,{}).subscribe(data =>{
        console.log(item);
        this.nombre = data['Nombre_Inst'];
        this.subsistema = data['Subsistema'];
        this.correo = data['Correo_Elect_Inst'];
        this.domicilio = data['Domicilio'];
        this.localidad = data['Localidad'];
        this.municipio = data['Municipio'];
        this.telefono = data['Telefono'];
        this.status = data['Status'];
  
    }) 
    });
  }

  back(){
    this.router.navigate(['/home'], { skipLocationChange: true } );
  }

  ngOnInit() {
  }

}
