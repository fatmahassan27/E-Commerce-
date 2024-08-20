import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent {
  productId: number=0;
  product: any = {};

  constructor(private activatedRoute: ActivatedRoute,private router: Router,private productService: ProductsService) { }

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '');
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.updateProductById(this.productId, this.product).subscribe(() => {
      console.log('Product updated successfully.');
      
      this.router.navigate(['/Products/details', this.productId]);
    });
  }
}
