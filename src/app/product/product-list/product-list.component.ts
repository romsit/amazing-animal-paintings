import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = []

  constructor(private productServicee: ProductService) {}
  
  ngOnInit(): void {
   this.productServicee.getProducts().subscribe(data => {
    this.products = data
   }) 
  }
  
}
