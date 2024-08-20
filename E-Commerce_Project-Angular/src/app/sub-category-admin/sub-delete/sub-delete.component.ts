import { Component } from '@angular/core';
import { SubCategoryService } from '../../Services/sub-category.service';

@Component({
  selector: 'app-sub-delete',
  standalone: true,
  imports: [],
  templateUrl: './sub-delete.component.html',
  styleUrl: './sub-delete.component.css'
})
export class SubDeleteComponent {
  Subcats: any[]=[];
 constructor(public SubCatService:SubCategoryService){}

}
