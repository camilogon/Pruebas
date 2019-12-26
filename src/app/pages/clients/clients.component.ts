import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from 'src/app/services/service-client.service';
import { ClientModel } from 'src/app/Models/client.model';
import { Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    clients:ClientModel[]=[];
    cargando=false;
  constructor(private clientService:ServiceClientService) { }

  ngOnInit() {
    this.cargando=true;
    this.clientService.getClients().subscribe((resp:any)=>{
      this.clients=resp;
      this.cargando=false;
      console.log(this.clients);
    })
  }

  deleteClient(client:ClientModel,i:number){
    Swal.fire({
      title: '¿esta seguro?',
      text:`esta seguro que desea borrar a ${client.name}`,
      icon :'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
       if(resp.value){
        this.clients.splice(i,1);
        this.clientService.deleteClient(client.id).subscribe();
       }
    })

  }
}
