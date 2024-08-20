import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 constructor( public account:AccountService){}
}
