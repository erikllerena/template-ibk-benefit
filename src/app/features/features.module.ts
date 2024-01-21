import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CatalogComponent, DetailProductComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    PipesModule,
    FormsModule,
    RouterModule
  ]
})
export class FeaturesModule { }
