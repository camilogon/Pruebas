import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../../models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ServiceClientService } from 'src/app/services/service-client.service';
import { ClientModel } from '../../models/client.model';
import { OrderModel, OrderDetailModel } from '../../models/order.model';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  frmPedidos: FormGroup;

  order: OrderModel = new OrderModel();
  detailOrder: Array<OrderDetailModel> = []
  // orderDet:OrderDetailModel= new OrderDetailModel()
  product: ProductModel = new ProductModel();
  products: ProductModel[] = [];
  // client:ClientModel= new ClientModel();
  clients: ClientModel[] = [];
  // orders:OrderModel[]=[];
  cargando = false;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private clientService: ServiceClientService) {
    this.getProducts();
    this.getClients();
  }

  ngOnInit() {

    this.frmPedidos = this.fb.group({
      cliente: [''],
      producto: [''],
      cantidad: ['', Validators.required]
    })

    if ((!this.ProductService.retornarProduct || this.ProductService.retornarProduct.length == 0)
      || (!this.clientService.retornarClientes || this.clientService.retornarClientes.length == 0)) {
      this.getProducts();
      this.getClients();
    } else {
      this.getProducts();
      this.getClients();

    }
    const id = this.route.snapshot.paramMap.get('id');
    /* if(id!== 'nuevo'){
      this.orderService.getOrder(Number(id)).subscribe((resp:OrderModel)=>{
        this.order=resp;
        this.product.idProduct=Number(id);
      })
    } */

  }

  getProducts() {
    this.ProductService.getProducts().subscribe((resp: any) => {
      this.products = resp;
    })
  }

  getClients() {
    this.clientService.getClients().subscribe((resp: any) => {
      console.log(resp);
      this.clients = resp;
    })
  }

  save() {

    if (this.frmPedidos.valid) {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando Info',
        icon: 'info',
        allowOutsideClick: false
      });
      this.mapearPedido();
      
    } else {
      console.log("formulario no valido");
    }

    // if (!form.valid) {
    //   console.log("formulario no valido");
    //   return;
    // }
    

    // Swal.showLoading();
    // let peticion: Observable<any>;
    // let date = Date.now();


    // peticion = this.orderService.addOrder(this.order)

    /* peticion.subscribe(resp => {
       Swal.fire({
         title: this.product.name,
         text: 'Se Actualizo Correctamente',
         icon: 'success'
       });
     }) */
  }

  mapearPedido() {
    this.order.date = new Date();
    this.order.idClient = this.frmPedidos.get('cliente').value;
    this.order.detalles = this.detailOrder;
  }

  agregarProducto() {
    this.detailOrder.push({
      idProduct: this.frmPedidos.get('producto').value,
      quantity: this.frmPedidos.get('cantidad').value,
      idOrderDatails: 0
    })

    this.limpiarControles();
  }

  limpiarControles() {
    this.frmPedidos.get('producto').setValue('');
    this.frmPedidos.get('cantidad').setValue('');
  }
}
