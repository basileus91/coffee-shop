import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from 'app/home/shopping-card.service';
import { ICoffe } from 'app/shared/model/coffe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  coffeeList: ICoffe[] = [];
  totalAmountPrice = 0;

  constructor(private shoppingCardService: ShoppingCardService, private router: Router) {}

  ngOnInit() {
    this.coffeeList = this.shoppingCardService.getProductsFromCard();
    this.coffeeList.forEach(value => {
      this.totalAmountPrice += value.orderedAmount * value.price;
    });
  }

  removeFromList(id: number) {
    for (let i = 0; i < this.coffeeList.length; i++) {
      if (this.coffeeList[i].id === id) {
        this.coffeeList.splice(i, 1);
        this.shoppingCardService.removeFromCard(id);
        this.shoppingCardService.shoppingCartChanges.next(this.coffeeList);
      }
    }
  }

  addAmount(coffee: ICoffe) {
    this.coffeeList.forEach(value => {
      if (value.id === coffee.id) {
        value.orderedAmount += 1;
        this.totalAmountPrice += value.price;
      }
    });
  }

  removeAmount(coffee: ICoffe) {
    this.coffeeList.forEach(value => {
      if (value.id === coffee.id) {
        if (value.orderedAmount > 0) {
          value.orderedAmount -= 1;
          this.totalAmountPrice -= value.price;
        }
      }
    });
  }

  orderCheckout() {
    this.router.navigate(['/cart/checkout']);
  }
}
