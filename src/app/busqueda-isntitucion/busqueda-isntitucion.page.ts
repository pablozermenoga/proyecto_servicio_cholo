import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-busqueda-isntitucion',
  templateUrl: './busqueda-isntitucion.page.html',
  styleUrls: ['./busqueda-isntitucion.page.scss'],
})
export class BusquedaIsntitucionPage implements OnInit {
  list:any=[];
  listfija:any=[];
  isItemAvailable:boolean=false;
  constructor (private http: HTTP, 
               private httpClient:HttpClient, 
               private storage: Storage, 
               private router:Router)
  {
  }
  
  async getInstituciones(){
    this.httpClient.get('http://sigmovil.herokuapp.com/getescuelas').subscribe(data =>{
      for(let i in data){
        console.log(data[i].Nombre_Inst);
        this.list.push({nombre:data[i].Nombre_Inst,
                        id:data[i].id,
                        clave:data[i].clave});
        this.listfija.push({nombre:data[i].Nombre_Inst,
                            id:data[i].id,
                            clave:data[i].clave});
      }
    });
  }
  
  getItems(ev:any){
    const val = ev.target.value;

    if(val && val.trim()!=''){
      this.isItemAvailable=true;
      this.list=this.listfija;
      this.list=this.list.filter((item)=>{
        return(item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    console.log(this.list)
    if(this.list.length == 0 && val && val.trim()!=''){
      this.isItemAvailable=true;
      this.list=this.listfija;
      this.list=this.list.filter((item)=>{
        return(item.clave.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  info(id){
    this.storage.set("id",id);
    this.storage.set("ventana",2);
    this.router.navigate(["/info"]);
  }
  cancelar(){
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.getInstituciones();
  }
}
