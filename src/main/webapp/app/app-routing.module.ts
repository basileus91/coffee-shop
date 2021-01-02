import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { CartComponent } from 'app/home/cart/cart.component';
import { CheckoutComponent } from 'app/home/checkout/checkout.component';
import { FinishedOrderComponent } from 'app/home/finished-order/finished-order.component';
import { ShopComponent } from 'app/home/shop/shop.component';
import { AboutUsComponent } from 'app/home/about-us/about-us.component';
import { ContactsComponent } from 'app/home/contacts/contacts.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: './admin/admin.module#CoffeshopAdminModule'
        },
        {
          path: 'shop',
          component: ShopComponent,
          data: {
            authorities: [],
            pageTitle: 'home.titleCart'
          }
        },
        {
          path: 'about-us',
          component: AboutUsComponent,
          data: {
            authorities: [],
            pageTitle: 'global.menu.about-us'
          }
        },
        {
          path: 'contacts',
          component: ContactsComponent,
          data: {
            authorities: [],
            pageTitle: 'global.menu.contacts'
          }
        },
        {
          path: 'shop/cart',
          component: CartComponent,
          data: {
            authorities: [],
            pageTitle: 'home.titleCart'
          }
        },
        {
          path: 'shop/cart/checkout',
          component: CheckoutComponent,
          data: {
            authorities: [],
            pageTitle: 'home.titleCheckout'
          }
        },
        {
          path: 'shop/cart/checkout/completed',
          component: FinishedOrderComponent,
          data: {
            authorities: [],
            pageTitle: 'home.titleCheckout'
          }
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class CoffeshopAppRoutingModule {}
