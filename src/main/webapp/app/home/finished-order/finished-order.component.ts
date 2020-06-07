import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from 'app/home/shopping-card.service';
import { ActivatedRoute } from '@angular/router';
import { OrderedCoffeService } from 'app/entities/ordered-coffe';

@Component({
  selector: 'jhi-finished-order',
  templateUrl: './finished-order.component.html',
  styleUrls: ['./finished-order.component.scss']
})
export class FinishedOrderComponent implements OnInit {
  constructor(
    private shoppingCardService: ShoppingCardService,
    private route: ActivatedRoute,
    private orderedCoffeeService: OrderedCoffeService
  ) {}

  ngOnInit() {
    this.shoppingCardService.removeAllFromCard();
    this.route.queryParams.subscribe(param => {
      console.log(param.order);
      if (param.order !== null && param.order !== undefined) {
        this.orderedCoffeeService.sendEmail(param.order).subscribe();
        console.log(param.order);
      }
    });
  }
}
