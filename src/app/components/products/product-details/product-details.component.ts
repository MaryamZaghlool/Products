import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../models/iproduct';
import { SimulationAPIService } from '../../../services/simulation-api.service';
@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product: IProduct | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    // private productService: StaticProductService
    private simualtionApi: SimulationAPIService
  ) {
  }
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId)
    // this.product = this.productService.getProduct(Number(this.productId));
    this.simualtionApi.getProductById(this.productId).subscribe({
      next: (response) => (this.product = response),
      error: (error) => error,
    });
  }

}
