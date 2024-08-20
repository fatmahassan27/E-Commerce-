import { Component } from '@angular/core';
import { RegisterService } from '../Services/register.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRegister } from '../Models/user-register';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  Custom:UserRegister=new UserRegister("","","","","","",new Date());

  constructor(private registerService:RegisterService ,private router:Router){
  }
  sub:Subscription|null=null;
  save(){
    this.sub=this.registerService.addCustomer(this.Custom).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl("/Home");
    });

  }
  ngOnDestroy(){
    this.sub?.unsubscribe();
  }
}
