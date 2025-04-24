import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulationAPIService } from '../../../services/simulation-api.service';
import { StaticProductService } from '../../../services/static-product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productId: any;
  constructor(
    private SimulationApi: SimulationAPIService,
    private router: Router,
    private StaticProductService: StaticProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,50}$/)]),
    price: new FormControl('', [Validators.required, Validators.min(10)]),
    quantity: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    //this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.getName.setValue('');
        this.getPrice.setValue('');
        this.getQuantity.setValue('');
      },
    });
    if (this.productId != 0) {
      this.SimulationApi.getProductById(this.productId).subscribe({
        next: (response) => {
          this.getName.setValue(response.name);
          this.getPrice.setValue(response.price.toString());
          this.getQuantity.setValue(response.quantity.toString());
        },
      });
    }
  }

  get getName() {
    return this.productForm.controls['name'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  products: any[] = [];
  productContent: { name: any, price: any, quantity: any }[] = [];
  productValue: any;

  // addProduct() {
  //   if (this.productForm.invalid) {
  //     console.log('Fix Errors');
  //     return;
  //   }

  //   let newProduct = this.productForm.value;

  //   const duplicate = this.products.some(product =>
  //     product.name.toLowerCase() === newProduct.name?.toLowerCase()
  //   );

  //   if (duplicate) {
  //     alert('This product already exists!');
  //     return;
  //   }

  //   // Add product to local list
  //   this.products.push(newProduct);
  //   this.productContent.push(newProduct as { name: string, price: string, quantity: string });
  //   console.log(newProduct)

  //   if (!newProduct.name || this.productService.isDuplicateProduct(newProduct.name)) {
  //     {
  //       alert('This product already exists!');
  //       return;
  //     }
  //   }
  //   // Save product data to use it in handler
  //   this.productValue = newProduct;

  //   this.productHandler()
  //   // Reset form
  //   this.productForm.reset();
  // }

  // productHandler() {
  //   this.productService.addNewProduct({
  //     id: this.productService.getNextId(),
  //     name: this.productValue.name,
  //     price: Number(this.productValue.price),
  //     quantity: Number(this.productValue.quantity),
  //   });

  //   // Navigate after successful addition
  //   this.router.navigate(['/products']);
  // }

  productHandler() {
    console.log(this.productForm.value);
    if (this.productForm.status == 'VALID') {
      if (this.productId == 0) {
        // add Product
        this.SimulationApi.addProduct(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
        });
      } else {
        this.SimulationApi
          .editProduct(this.productId, this.productForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/products']);
            },
          });
      }
    } else {
      console.log('fix Errors');
    }
  }
}
