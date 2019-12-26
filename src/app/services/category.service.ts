import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../Models/category.model';
import { map, delay} from 'rxjs/operators';
import {environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.urlSevises;
  private categories:CategoryModel[] =[];
  constructor(private http:HttpClient) { }
  
  set retornarCategorias(value:CategoryModel[]){
      this.categories=value;
  }
  
  get retornarCategorias():CategoryModel[]{
    return this.categories;
  }
  getCategories(){
    return this.http.get(`${this.url}/Categoys`);
  } 
  getCategory(id:number){
      return this.http.get(`${this.url}/Categoys/${id}`);
  }
    
  addCategory(Category:CategoryModel){
      return this.http.post(`${this.url}/Categoys`,Category)
            .pipe(
              map((resp:any)=>{
                Category.idCategory= resp.name;
                return Category;
              })
            );
    }

    updateCategory(Category:CategoryModel){
        return this.http.put(`${this.url}/Categoys/${Category.idCategory}`,Category);
    }

 
    deleteCategory(id:number){
      return this.http.delete(`${this.url}/Categoys/${id}`);
    }

    createArray(CategoryObj:Object){
     
      const clients:CategoryModel[]=[];
      if(CategoryObj===null){
        return [];
      }
      Object.keys(CategoryObj).forEach(key=>{
        const Category: CategoryModel = CategoryObj[key];
        Category.idCategory = Number(key);
        clients.push(Category)
      })
      
      return clients ;
    }
}
