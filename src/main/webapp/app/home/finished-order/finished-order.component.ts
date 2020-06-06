import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from 'app/home/shopping-card.service';

@Component({
  selector: 'jhi-finished-order',
  templateUrl: './finished-order.component.html',
  styleUrls: ['./finished-order.component.scss']
})
export class FinishedOrderComponent implements OnInit {
  constructor(private shoppingCardService: ShoppingCardService) {}

  ngOnInit() {
    this.shoppingCardService.removeAllFromCard();
  }
}
