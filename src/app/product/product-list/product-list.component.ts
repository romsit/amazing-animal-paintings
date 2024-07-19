import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = []
  filteredProducts: Product[] = []

  constructor(private productServicee: ProductService, private cartService: CartService, private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
   this.productServicee.getProducts().subscribe(data => {
    this.products = data;
    this.filteredProducts = data
   }) 
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("Product added to cart!", "", {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    })
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase()

    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(searchTerm))
  }
  
}
