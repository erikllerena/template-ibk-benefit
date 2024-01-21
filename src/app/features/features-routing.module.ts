import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailProductComponent } from './detail-product/detail-product.component';


const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'detail-product/:id', component: DetailProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
