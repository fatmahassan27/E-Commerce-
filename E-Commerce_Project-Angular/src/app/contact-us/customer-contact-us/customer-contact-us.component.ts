import { Component } from '@angular/core';
import { Contact } from '../../Models/contact';
import { Route, Router } from '@angular/router';
import { ContactUsService } from '../../Services/contact-us.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customer-contact-us.component.html',
  styleUrl: './customer-contact-us.component.css'
})
export class CustomerContactUsComponent {

  Cont:Contact=new Contact(0,"","","","",new Date());

  constructor(private contactService:ContactUsService ,private router:Router){
  }
  sub:Subscription|null=null;
  save(){
    this.sub=this.contactService.addContact(this.Cont).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl("/home");
    });

  }
  ngOnDestroy(){
    this.sub?.unsubscribe();
  }
}



