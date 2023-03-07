import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    id: '',
    article: 0,
    name: '',
    category: '',
    price: 0,
    price_sale: 0,
    stock: 0,
    image: ''
  };
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }
  submitProduct() {
    this.productService.createProduct(this.product)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.log(err)
      )
  }
}
