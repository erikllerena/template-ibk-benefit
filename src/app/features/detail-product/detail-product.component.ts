import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiFromJsonService } from 'src/app/core/services/api-from-json.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.sass']
})
export class DetailProductComponent implements OnInit {

  product: Product;
  quantityProduct: number = 1;
  otherProducts: Product[] = [];
  showCarousel = false;

  private routeSub: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.showCarousel = window.innerWidth <  400;
  }
  
  constructor(private route: ActivatedRoute, private apiFromJsonService: ApiFromJsonService, 
      private router: Router, private cartService: CartService, private renderer: Renderer2) {
    this.product = {} as Product;
   }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(async params => {
      this.product = await this.apiFromJsonService.getProductById(params['id']);
      this.otherProducts = (await this.apiFromJsonService.getProducts().toPromise()).filter(x => x.uuid != this.product.uuid);
    });
    
  }

  addProduct(product: Product) {
    this.notificationToast(this.cartService.add(product, this.quantityProduct));
  }

  createToast(message: string) {
    let toastBox = document.getElementById("tib-toastBox");
    const toast: HTMLElement = this.renderer.createElement('div');    
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

  slideImage(idOrder: number, event: any) {
    event.preventDefault();
    const displayWidth = document.querySelector('.tib-detail-img-showcase img:first-child').clientWidth;
    const nodes: HTMLElement = document.querySelector('.tib-detail-img-showcase');
    nodes.style.transform = `translateX(${- (idOrder - 1) * displayWidth}px)`;
  }

  navigateTo(uuid: string) {
    this.router.navigate(['/detail-product', uuid])
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
