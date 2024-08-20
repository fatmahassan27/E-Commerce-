import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import {  CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { CartService } from '../../Services/cart.service';



@Component({
  selector: 'app-checkout',
  standalone:true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: 'check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})





export class CheckOutComponent implements OnInit {
  checkoutForm !: FormGroup;
  userId:  number =0;
  userType:  string ='';
  productIds:any[]=[];
  productNames: any[] = [];
  quantities:any[]=[];


  constructor(private http: HttpClient,private nacctrl: NavController,private router: Router,
    private route: ActivatedRoute,private location: Location,private formBuilder: FormBuilder, private alertController: AlertController,public cartservice:CartService , public account:AccountService) {

    }
    async ngOnInit() {

      this.checkoutForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        address: ['', Validators.required],
        streetAddress: ['', Validators.required],
        postalCode: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        paymentMethod: [''],
        cardHolderName: [''],
        cardNumber: [''],
        expiryDate: [''],
        cvv: ['']
      });
      const queryParams = this.route.snapshot.queryParams;
      this.userId = queryParams['userId'];
      this.userType = queryParams['userType'];
      console.log('User ID:', this.userId);
      console.log('User Type:', this.userType);

      // Extract total and product names from query parameters
      if (queryParams['productIds']) {
        this.productIds = queryParams['productIds'].split(',');
      }

      if (queryParams['productNames']) {
        this.productNames = queryParams['productNames'].split(',');
      }
      if (queryParams['quantities']) {
        this.quantities = queryParams['quantities'].split(',');
      }


    }






    async submitForm(userId:number) {


      if (this.checkoutForm.valid && this.productNames.length > 0 && this.productIds.length > 0) {
        try {

          const paymentData = {
            name: this.checkoutForm.get('fullName')?.value,
            address: this.checkoutForm.get('address')?.value,
            paymentMode: this.checkoutForm.get('paymentMethod')?.value,
            cardNo: this.checkoutForm.get('cardNumber')?.value,
            expDate: this.checkoutForm.get('expiryDate')?.value,
            ccVNo: this.checkoutForm.get('cvv')?.value
          };

          const paymentResponse = await this.http.post<any>('https://localhost:7016/api/Payment', paymentData).toPromise();
          console.log(paymentResponse.paymentId)
          const payId = paymentResponse.paymentId;

          // Step 2: Create order entries for each product
          for (let i = 0; i < this.productNames.length; i++) {
            const orderData = {
              userId: this.userId,
              productId: this.productIds[i],
              productName: this.productNames[i],
              paymentId: payId,
              quantity: this.quantities[i],
              orderDate:  new Date().toISOString()

            };

            const orderResponse = await this.http.post<any>('https://localhost:7016/api/Order', orderData).toPromise();
            console.log('Order registered successfully. Order ID:', orderResponse.orderId);
          }

          await this.presentSuccessAlert();
          this.goToHomePage(userId);
        } catch (error) {
          console.error('Error registering order:', error);
        }
      } else {
        console.error('Form is invalid or no product names are available.');
      }

    }


    async presentSuccessAlert() {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Order added successfully',
        buttons: ['OK']
      });

      await alert.present();
    }





  goBack() {
    this.location.back();

  }
  goToHomePage(userId:number) {
    this.router.navigate(['/home'], { queryParams: { userId: this.userId, userType: this.userType } });
    this.DeleteCartItems(userId)
  }

  DeleteCartItems(userId:number)
  {
    this.router.navigateByUrl("/PlaceOrder")
    this.cartservice.DeleteUserItems(userId).subscribe({
      next: () => {
        console.log('Product deleted successfully.');
        this.cartservice.updateCartCount(0)
      },
    });
  }
}

