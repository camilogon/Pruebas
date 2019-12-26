export class OrderModel{
    
    idOrder:number;
    date:Date;
    idClient:number
    detalles:OrderDetailModel[];
    
    constructor(){
    }
}


export class OrderDetailModel{
    idOrderDatails:number;
    quantity:number;
    idProduct:number 
    constructor(){
    }
}
