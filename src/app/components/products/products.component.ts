import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../models/iproduct';
import { SimulationAPIService } from '../../services/simulation-api.service';
import { StaticProductService } from '../../services/static-product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  size!: string;
  category!: string;
  products: IProduct[] = [];
  subscription!: Subscription;
  constructor(
    private productServices: StaticProductService,
    private router: Router,
    private simulationApi: SimulationAPIService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.simulationApi.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => console.log(error),
    });
  }

  filterBy() {
    this.router.navigate(['/products'], {
      queryParams: { size: this.size, category: this.category },
    });
  }
  deleteHandler(productId: string) {
    this.simulationApi.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product) => product.id != productId
        );
      },
    });
  }
  // deleteProduct(product: IProduct) {
  //   this.productServices.deleteProduct(product);
  // }
  // productDetail: IProduct | null = null;
  // showProductDetails(productId: number) {
  //   this.productDetail = this.productServices.getProduct(productId);
  // }
}
