import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/Models/category.model';
import { Subscriber } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categories:CategoryModel[]=[];
    cargando=false;
  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.cargando=true;
    this.categoryService.getCategories().subscribe((resp:any)=>{
      this.categories=resp;
      this.cargando=false;
      console.log(this.categories);
    })
  }

  deleteClient(category:CategoryModel,i:number){
    Swal.fire({
      title: '¿esta seguro?',
      text:`esta seguro que desea borrar a ${category.name}`,
      icon :'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
       if(resp.value){
        this.categories.splice(i,1);
        this.categoryService.deleteCategory(category.idCategory).subscribe();
       }
    })

  }

}
