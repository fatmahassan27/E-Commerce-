import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { UserLogin } from '../../Models/user-login';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  user:UserLogin=new UserLogin("","");

  constructor(public accountService:AccountService , public router:Router){}

  login(){
    this.accountService.login(this.user);
  }
}
