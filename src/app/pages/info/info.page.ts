import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  
  institucion: Observable<any>;

  constructor(public httpCliente: HttpClient) { 
    this.institucion = this.httpCliente.get("http://sigmovil.herokuapp.com/getescuela/1",{});
    this.institucion.subscribe(data =>{
      console.log('My data: ', data);
  }) 
  }

  ngOnInit() {
  }

}
