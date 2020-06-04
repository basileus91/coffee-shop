import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICoffeAmount } from 'app/shared/model/coffe-amount.model';

@Component({
  selector: 'jhi-coffe-amount-detail',
  templateUrl: './coffe-amount-detail.component.html'
})
export class CoffeAmountDetailComponent implements OnInit {
  coffeAmount: ICoffeAmount;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ coffeAmount }) => {
      this.coffeAmount = coffeAmount;
    });
  }

  previousState() {
    window.history.back();
  }
}
