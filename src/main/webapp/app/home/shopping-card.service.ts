import { Injectable } from '@angular/core';
import { ICoffe } from 'app/shared/model/coffe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  coffeCart: ICoffe[] = [];
  orederedCofee: ICoffe;
  shoppingCartChanges = new Subject<ICoffe[]>();
  constructor() {}

  addToCart(amount: number, coffe: ICoffe) {
    if (this.coffeCart.length < 1) {
      coffe.orderedAmount = amount;
      this.coffeCart.push(coffe);
      this.shoppingCartChanges.next([...this.coffeCart]);
    } else {
      this.orederedCofee = this.coffeCart.find(value => value.id === coffe.id);
      if (this.orederedCofee) {
        this.orederedCofee.orderedAmount += amount;
        this.shoppingCartChanges.next([...this.coffeCart]);
      } else {
        coffe.orderedAmount = amount;
        this.coffeCart.push(coffe);
        this.shoppingCartChanges.next([...this.coffeCart]);
      }
    }
  }

  getProductsFromCard() {
    return this.coffeCart;
  }

  removeFromCard(id) {
    for (let i = 0; i < this.coffeCart.length; i++) {
      if (this.coffeCart[i].id === id) {
        this.coffeCart.splice(i, 1);
      }
    }
  }
}
