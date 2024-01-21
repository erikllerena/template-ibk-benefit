
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    MenuComponent
  ]
})
export class ComponentsModule { }
