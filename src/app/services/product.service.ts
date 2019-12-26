import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Models/product.model';
import { map, delay} from 'rxjs/operators';
import {environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.urlSevises;
  private products:ProductModel[]=[];
  constructor(private http:HttpClient) { }
  
   
  set retornarProduct(value:ProductModel[]){
    this.products=value;
  }

  get retornarProduct():ProductModel[]{
  return this.products;
  }
  getProducts(){
    return this.http.get(`${this.url}/Products`);
  } 
  getProduct(id:number){
      return this.http.get(`${this.url}/Products/${id}`);
  }
    
  addProduct(product:ProductModel){
      return this.http.post(`${this.url}/Products`,product)
            .pipe(
              map((resp:any)=>{
                product.idCategory= resp.name;
                return product;
              })
            );
    }

    updateProduct(product:ProductModel){
      
      return this.http.put(`${this.url}/Products/${product.idProduct}`,product);
    }

 
    deleteProduct(id:number){
      return this.http.delete(`${this.url}/Products/${id}`);
    }

    createArray(productObj:Object){
     
      const clients:ProductModel[]=[];
      if(productObj===null){
        return [];
      }
      Object.keys(productObj).forEach(key=>{
        const product: ProductModel = productObj[key];
        product.idProduct = Number(key);
        clients.push(product)
      })
      
      return clients ;
    }
}
