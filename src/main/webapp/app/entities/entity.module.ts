import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'category',
        loadChildren: './category/category.module#CoffeshopCategoryModule'
      },
      {
        path: 'coffe',
        loadChildren: './coffe/coffe.module#CoffeshopCoffeModule'
      },
      {
        path: 'client',
        loadChildren: './client/client.module#CoffeshopClientModule'
      },
      {
        path: 'order',
        loadChildren: './order/order.module#CoffeshopOrderModule'
      },
      {
        path: 'coffe-amount',
        loadChildren: './coffe-amount/coffe-amount.module#CoffeshopCoffeAmountModule'
      },
      {
        path: 'ordered-coffe',
        loadChildren: './ordered-coffe/ordered-coffe.module#CoffeshopOrderedCoffeModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeshopEntityModule {}
