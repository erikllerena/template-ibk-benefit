import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiFromJsonService } from 'src/app/core/services/api-from-json.service';
import { CartService } from 'src/app/core/services/cart.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Category, Product, SubCategory } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass']
})
export class CatalogComponent implements OnInit {

  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  products: Product[] = [];
  productsFilter: Product[] = [];

  constructor(private apiFromJsonService: ApiFromJsonService, private cartService: CartService, 
      private renderer: Renderer2, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.fillData();
    setTimeout(() => {
      this.selectSubCategory(this.localStorageService.get('search')? JSON.parse(this.localStorageService.get('search')).categories : '');
    }, 200)
  }

  fillData() {
    forkJoin([
      this.apiFromJsonService.getCategories(), this.apiFromJsonService.getSubCategories(), this.apiFromJsonService.getProducts()
    ]).subscribe(
      ([
        responseCategories, responseSubCategories, responseProducts
      ]) => {
        this.categories = responseCategories; this.subCategories = responseSubCategories; this.products = responseProducts;
      }
    );
  }

  selectSubCategory(uuid: string){
    console.log(uuid)
    if(!uuid) return;
    const element = document.getElementById(uuid);
    if(element.classList.contains('active')) {
      element.classList.remove('active');
      this.productsFilter = this.productsFilter.filter(x => x.uuidSubCategory != uuid);
    } else {
      element.classList.add('active');
      this.productsFilter.push(...this.products.filter(x => x.uuidSubCategory == uuid));
    }
  }

  addProduct(product: Product) {
    this.notificationToast(this.cartService.add(product));
  }

  createToast(message: string) {
    let toastBox = document.getElementById("tib-toastBox");
    const toast = this.renderer.createElement('div');    
    toast.classList.add("tib-toast");    
    toast.setAttribute('onclick', 'this.remove()')
    const icon = this.renderer.createElement('i');
    icon.classList.add("fa-solid", "fa-circle-check");
    const text = this.renderer.createElement('span');
    text.innerHTML = message;
    this.renderer.appendChild(toast, icon);
    this.renderer.appendChild(toast, text);
    toastBox.appendChild(toast);
    setTimeout(() => {
      toast.remove();
     }, 6000);
  }

  notificationToast(message: string) {
    this.createToast(message)
  }

  navigateTo(uuid: string) {
    this.router.navigate(['/detail-product', uuid])
  }

}
