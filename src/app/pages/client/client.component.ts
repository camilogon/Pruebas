import { Component, OnInit } from '@angular/core';
import {ClientModel} from '../../models/client.model';
import { NgForm } from '@angular/forms';
import { ServiceClientService } from 'src/app/services/service-client.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client:ClientModel= new ClientModel();
  constructor(private clientService: ServiceClientService, private route :ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.clientService.getClient(Number(id)).subscribe((resp:ClientModel)=>{
        this.client=resp;
        this.client.id=Number(id);
      })
    }
  }

  save(form:NgForm){
    if(!form.valid){
      console.log("formulario no valido");
      return;
    }
    Swal.fire({
        title:'Espere',
        text:'Guardando Info',
        icon:'info',
        allowOutsideClick:false
      });

    Swal.showLoading();
    let peticion: Observable<any>;

    if(this.client.id){
        peticion= this.clientService.updateClient(this.client)
    }else{
      peticion=this.clientService.addClient(this.client)
    }
    peticion.subscribe(rep=>{
      Swal.fire({
        title:this.client.name,
        text:'Se Actualizo Correctamente',
        icon:'success'
      });
    })
  }

}
