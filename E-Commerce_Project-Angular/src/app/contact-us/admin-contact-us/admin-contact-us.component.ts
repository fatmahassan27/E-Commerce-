import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../../Models/contact';
import { ContactUsService } from '../../Services/contact-us.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contact-us.component.html',
  styleUrl: './admin-contact-us.component.css'
})
export class AdminContactUsComponent implements OnInit
{

  Conts:Contact[]=[]
  constructor(public contactService:ContactUsService){}
  ngOnInit(): void {
   this.contactService.getAll().subscribe(data=>{
    console.log(data)
    this.Conts=data;
   })
  }

}
