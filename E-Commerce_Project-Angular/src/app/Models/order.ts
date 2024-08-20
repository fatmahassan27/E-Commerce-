export class Order {

    constructor(
        public orderId: number,
        public quantity: number,
        public orderDate: Date,
        public userId: number,
        public productId:number,
        public paymentId: number,
        public productName: string,
        

        
    ){}

}

