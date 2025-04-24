import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaticProductService {
  // products: IProduct[];
  // constructor() {
  //   this.products = []
  // }

  // private currentId = 0;

  // getNextId(): number {
  //   return ++this.currentId;
  // }

  // isDuplicateProduct(name: string): boolean {
  //   return this.products.some(p => p.name.toLowerCase() === name.toLowerCase());
  // }

  // getALLProducts(): IProduct[] {
  //   return this.products;
  // }

  // addNewProduct(product: any) {
  //   this.products.push(product);
  // }
  // getProduct(productId: number) {
  //   const index = this.products.findIndex(p => p.id === productId);
  //   console.log(this.products[index]);
  //   return index !== -1 ? this.products[index] : null;
  // }
  // // edit

  // deleteProduct(product: any) {
  //   const index = this.products.findIndex(p => p.id === product.id);
  //   if (index !== -1) {
  //     this.products.splice(index, 1);
  //   }
  // }
}
