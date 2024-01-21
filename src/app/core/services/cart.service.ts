import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, Product } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSaved = new BehaviorSubject<Cart[]>([]);
  readonly cartSaved$ = this.cartSaved.asObservable();

  constructor() {
    this.cartSaved.next(JSON.parse(localStorage.getItem('cart')));
  }

  add(productAdded: Product, quantity: number = 1): string {
    let message = '';
    let cart: Cart[] = [];
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));   
    }       
    const productExistInCart = cart.find(
      (item) => item.product.uuid === productAdded.uuid
    );    
    if (!productExistInCart) {
      cart.push({product: productAdded, count: quantity});
      message = `Se agregó el producto: ${productAdded.name}`;
    } else {
      productExistInCart.count += quantity;
      message = `Se actualizó el producto: ${productAdded.name}, cantidad: ${productExistInCart.count}`;
    }

    this.cartSaved.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    return message;
  }

  remove(product: Product){
    if(localStorage.getItem('cart')) {
      let cart: Cart[] = JSON.parse(localStorage.getItem('cart'));
      localStorage.setItem('cart', JSON.stringify(cart.filter(x => x.product.uuid != product.uuid)));
    } 
  }
}
