import { Component, OnInit } from '@angular/core';
import { Cart, Product } from './shared/interfaces';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'template-ibk-benefit';  
}
