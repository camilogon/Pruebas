import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel,OrderDetailModel } from '../Models/order.model';
import { map, delay} from 'rxjs/operators';
import {environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = environment.urlSevises;
  private categories:OrderModel[] =[];
  constructor(private http:HttpClient) { }
  
  set retornarOrdenes(value:OrderModel[]){
    this.categories=value;
}

get retornarOrdenes():OrderModel[]{
  return this.categories;
}
  
  getOrders(){
    return this.http.get(`${this.url}/Orders`);
  } 
  getOrder(id:number){
      return this.http.get(`${this.url}/Orders/${id}`);
  }
    
  addOrder(order:OrderModel){
      return this.http.post(`${this.url}/Orders`,order)
            .pipe(
              map((resp:any)=>{
                order.idOrder= resp.name;
                return order;
              })
            );
  }

  deleteOrderDetail(id:number){
    return this.http.delete(`${this.url}/Orders/${id}`);
  }

   
  getOrdersDetails(){
    return this.http.get(`${this.url}/OrdersDetails`);
  } 
  getorderDetail(id:number){
      return this.http.get(`${this.url}/OrdersDetails/${id}`);
  }
    
  addOrderDeatil(orderd:OrderDetailModel){
      return this.http.post(`${this.url}/OrdersDetails`,orderd)
            .pipe(
              map((resp:any)=>{
                orderd.idOrderDatails= resp.name;
                return orderd;
              })
            );
  }

  deleteOrder(id:number){
    return this.http.delete(`${this.url}/Orders/${id}`);
  }



    createArray(orderObj:Object){
     
      const clients:OrderModel[]=[];
      if(orderObj===null){
        return [];
      }
      Object.keys(orderObj).forEach(key=>{
        const order: OrderModel = orderObj[key];
        order.idOrder = Number(key);
        clients.push(order)
      })
      
      return clients ;
    }

}
