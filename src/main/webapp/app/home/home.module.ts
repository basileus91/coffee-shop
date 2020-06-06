import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoffeshopSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinishedOrderComponent } from './finished-order/finished-order.component';

@NgModule({
  imports: [CoffeshopSharedModule, RouterModule.forChild([HOME_ROUTE]), FormsModule, ReactiveFormsModule],
  declarations: [HomeComponent, ShoppingCardComponent, CartComponent, CheckoutComponent, FinishedOrderComponent],
  exports: [ShoppingCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeshopHomeModule {}
