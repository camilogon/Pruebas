import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {ProductModel} from '../../models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/Category.service';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product:ProductModel= new ProductModel();
  category:CategoryModel= new CategoryModel();
  categories:CategoryModel[]=[];

  constructor(private productService: ProductService,
              private route :ActivatedRoute,
              private categoryService: CategoryService,) {}

  ngOnInit() {
    
    if(!this.categoryService.retornarCategorias || this.categoryService.retornarCategorias.length==0)
    {
      this.getCategories();
      console.log("categories1",this.categories);
    }else{
      this.getCategories();
      console.log("categories2",this.categories);
    } 
    const id = this.route.snapshot.paramMap.get('id');
    if(id!== 'nuevo'){
      this.productService.getProduct(Number(id)).subscribe((resp:ProductModel)=>{
        this.product=resp;
        this.product.idProduct=Number(id);
      })
    }
  }


  getCategories(){
    this.categoryService.getCategories().subscribe((resp:CategoryModel[])=>{
      this.categories=resp;
      console.log("resp",resp);
      console.log("categories",this.categories);
    })
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
    console.log(this.product)
    if(this.product.idProduct){
        peticion= this.productService.updateProduct(this.product)
    }else{
      peticion=this.productService.addProduct(this.product)  
    }
    peticion.subscribe(resp=>{
      Swal.fire({
        title:this.product.name,
        text:'Se Actualizo Correctamente',
        icon:'success'
      });
    })
  }
}
