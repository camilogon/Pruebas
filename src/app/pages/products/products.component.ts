import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/Models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/Models/category.model';
import { Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:ProductModel[]=[];
  cargando=false;
  constructor(private categoryService:CategoryService, private productService:ProductService) { }

  ngOnInit() {
    this.cargando=true;
    this.productService.getProducts().subscribe((resp:any)=>{
      this.products=resp;
      this.cargando=false;
    })
  }
  deleteProduct(product:ProductModel,i:number){
    Swal.fire({
      title: '¿esta seguro?',
      text:`esta seguro que desea borrar a ${product.name}`,
      icon :'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
       if(resp.value){
        this.products.splice(i,1);
        this.productService.deleteProduct(product.idProduct).subscribe();
       }
    })

  }





}
