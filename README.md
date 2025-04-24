## lazy Loading

loadComponent: () =>
import('./components/products/products.component').then(
(m) => m.ProductsComponent
),
