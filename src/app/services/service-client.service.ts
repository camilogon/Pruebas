import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../Models/client.model';
import { map, delay} from 'rxjs/operators';
import {environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {
    
  url = environment.urlSevises;
  clients:ClientModel[]=[];
  constructor(private http:HttpClient) { }
   
  set retornarClientes(value:ClientModel[]){
    this.clients=value;
  }

  get retornarClientes():ClientModel[]{
    return this.clients;
  }
  getClients(){
    return this.http.get(`${this.url}/Clients`);
  } 
  getClient(id:number){
      return this.http.get(`${this.url}/Clients/${id}`);
  }
    
  addClient(client:ClientModel){
      return this.http.post(`${this.url}/Clients`,client)
            .pipe(
              map((resp:any)=>{
                client.id= resp.name;
                return client;
              })
            );
    }

    updateClient(client:ClientModel){
        return this.http.put(`${this.url}/Clients/${client.id}`,client);
    }

 
    deleteClient(id:number){
      return this.http.delete(`${this.url}/Clients/${id}`);
    }

    createArray(clientObj:Object){
      console.log("soy created array",clientObj);
      const clients:ClientModel[]=[];
      if(clientObj===null){
        return [];
      }
      Object.keys(clientObj).forEach(key=>{
        const client: ClientModel = clientObj[key];
        client.id = Number(key);
        clients.push(client)
      })
      
      return clients ;
    }

    


}
