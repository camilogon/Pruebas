import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  category:CategoryModel= new CategoryModel();
  constructor(private clientService: CategoryService, private route :ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.clientService.getCategory(Number(id)).subscribe((resp:CategoryModel)=>{
        this.category=resp;
        this.category.idCategory=Number(id);
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
    if(this.category.idCategory){
        peticion= this.clientService.updateCategory(this.category)
    }else{
      peticion=this.clientService.addCategory(this.category)
    }
    peticion.subscribe(rep=>{
      Swal.fire({
        title:this.category.name,
        text:'Se Actualizo Correctamente',
        icon:'success'
      });
    })
  }




}
