import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiFromJsonService } from 'src/app/core/services/api-from-json.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Category, Concept, Product, SubCategory } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  openSidebar: boolean = false;
  concepts: Concept[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  products: Product[] = [];
  productsByName: Product[] = [];
  countCart = 0;

  constructor(private apiFromJsonService: ApiFromJsonService, private cartService: CartService, private router: Router) {} 

  ngOnInit() {    
    this.fillData();
    this.cartService.cartSaved$.subscribe(response => this.countCart = response? response.length:0);
  }

  fillData() {
    forkJoin([
      this.apiFromJsonService.getConcepts(), this.apiFromJsonService.getCategories(), 
      this.apiFromJsonService.getSubCategories(), this.apiFromJsonService.getProducts()
    ]).subscribe(
      ([
        responseConcepts, responseCategories, responseSubCategories, responseProducts
      ]) => {
        this.concepts = responseConcepts; this.categories = responseCategories; 
        this.subCategories = responseSubCategories; this.products = responseProducts
      }
    );
  }

  searchByNameBox(event: any) {
    console.log(event.target.value)
    if(!event.target.value) {this.productsByName = []; return;}
    this.productsByName = this.products.filter(x => x.name.includes(event.target.value) || x.brand.includes(event.target.value))
  }

  navigateTo(uuid: string) {
    this.router.navigate(['/detail-product', uuid])
  }

}
