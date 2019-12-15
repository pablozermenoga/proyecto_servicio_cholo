import { Storage } from '@ionic/storage';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  
  anterior:Number=0;
  nombre:String;
  subsistema: String;
  correo: String;
  domicilio: String;
  localidad: String;
  municipio: String;
  telefono: String;
  status: String;
  clave:String;
  director:String;
 
  
  slider=[];

  constructor(public httpClient: HttpClient, private storage: Storage, private router: Router) { 
    
    this.storage.get("ventana").then((item)=>{this.anterior=item;});
    this.storage.get('id').then((item)=>{
      this.httpClient.get("https://signayarit.herokuapp.com/SigApp/SigMovil/id/"+item,{}).subscribe((data:any) =>{
        console.log(item);
        console.log(JSON.parse(data));
      var info = JSON.parse(data);
      this.nombre = info[0].fields.NombreEscuela;
      this.clave = info[0].pk;
      this.subsistema = info[0].fields.Nivel;
      this.director = info[0].fields.nombreDirector; 
      this.domicilio = info[0].fields.calle;
      this.localidad = info[0].fields.Localidad;
      this.municipio = info[0].fields.Municipio;
      this.status = info[0].fields.EstatusEscuela;
      this.correo = info[0].fields.Email;
      this.telefono = info[0].fields.Telefono_Director 
       /*
        if(data['Status']==true){
          this.status="Activo";
        }else{
          this.status="No activo";
        }
        let imgs=data['images'].split(',');
        for(let i in imgs){
          console.log('https://sigmovil.herokuapp.com/img/'+data['id']+'/'+imgs[i]);
            this.slider.push('https://sigmovil.herokuapp.com/img/'+data['id']+'/'+imgs[i]);
        };      
        if(imgs!=null){
          console.log("IMAGEN ENCONTRADA");
        }else{
        console.log("IMAGEN NO EXISTENTE");
         this.slider=["assets/img/notfound.jpg"];
        }
   
  */
    }) 
    });
  }
  

  back(){
    if(this.anterior==1){
      this.router.navigate(['/home'], { skipLocationChange: true } );
    }else{
      this.router.navigate(['/busqueda-isntitucion'], { skipLocationChange: true } );
    }
    
  }

  ngOnInit() {
  }
 /* slider=[
    {
      imagen: "../assets/img/tec_tepic_cb.jpg"
    },
    {
      imagen: "../assets/img/tec_tepic_liia.jpg"
    },
    {
      imagen: "../assets/img/tec_tepic_ud.jpg"
    },
    {
      imagen: "../assets/img/tec_tepic_cb.jpg"
    },
    {
      imagen: "../assets/img/tec_tepic_liia.jpg"
    },
    {
      imagen: "../assets/img/tec_tepic_ud.jpg"
    }
  ];*/
}
