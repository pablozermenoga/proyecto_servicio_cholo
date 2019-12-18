import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //dependencia para las peticiones rest
import { HTTP } from '@ionic-native/http/ngx'; //dependencia para las peticiones rest
import { Router } from '@angular/router'; //dependencia para navegacion entre ventanas dentro de la aplicacion
import { Storage } from '@ionic/storage'; //dependencia para acceder a la memoria cache de la aplicacion


@Component({
  selector: 'app-busqueda-isntitucion',
  templateUrl: './busqueda-isntitucion.page.html',
  styleUrls: ['./busqueda-isntitucion.page.scss'],
})
export class BusquedaIsntitucionPage implements OnInit {
  list:any=[]; //lista de las escuelas que se van a mostrar, varia dependiendo del filtro
  listfija:any=[]; //contiene todas las escuelas esta siempre se mantiene con el mismo valor
  isItemAvailable:boolean=false; //variable de control para esconder o mostrar la lista
  constructor (private http: HTTP, 
               private httpClient:HttpClient, 
               private storage: Storage, 
               private router:Router)
  {
  }
  
  //metodo para la obtencion de las intituciones
  async getInstituciones(){

    //para obtenerlas se realiza una peticion get a la url de la aplicacion del sistema
    this.httpClient.get('http://sigmovil.herokuapp.com/getescuelas').subscribe(data =>{
      //mediante un ciclo obtenemos cada una de las instituciones para agregarlas a la lista
      for(let i in data){
        //se agrega a la lista variable el nombre de la institucion el id y la clave
        this.list.push({nombre:data[i].Nombre_Inst,
                        id:data[i].id,
                        clave:data[i].clave});
        //se agrega a la lista fija los mismos valores
        this.listfija.push({nombre:data[i].Nombre_Inst,
                            id:data[i].id,
                            clave:data[i].clave});
      }
    });
  }
  

  //este metodo filtra la lista
  getItems(ev:any){ //ev es el evento del searchinput
    const val = ev.target.value;//se obtiene el valos del search input

    if(val && val.trim()!=''){ //comparamos si es diferente de vacio
      this.isItemAvailable=true; // la variable de control para mostrar la lista se activa
      this.list=this.listfija; // inicializa lista al estado inical de la lista
      this.list=this.list.filter((item)=>{ // se filtra mediante el valor que se obtuvo mediante el nombre
        return(item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if(this.list.length == 0 && val && val.trim()!=''){//comparamos si es diferente de vacio
      this.isItemAvailable=true;// la variable de control para mostrar la lista se activa
      this.list=this.listfija;// inicializa lista al estado inical de la lista
      this.list=this.list.filter((item)=>{// se filtra mediante el valor que se obtuvo mediante la clave
        return(item.clave.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  //metodo para abrir la intitucion en una nueva ventana
  info(id){
    // se envia a cache el id
    this.storage.set("id",id);
    // se envia a cache la instruccion de que se esta abriendo desde busqueda(2) y no desde home(1)
    this.storage.set("ventana",2);
    //se abre la ventana de info
    this.router.navigate(["/info"]);
  }
  cancelar(){
    //se abre la ventana de home
    this.router.navigate(['/home']);
  }

  //metodo inicial corre despues del constructor
  ngOnInit() {
    // ejecuta el metodo para obtener las instituciones
    this.getInstituciones();
  }
}
