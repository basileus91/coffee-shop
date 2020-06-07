import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderedCoffe } from 'app/shared/model/ordered-coffe.model';

@Component({
  selector: 'jhi-ordered-coffe-detail',
  templateUrl: './ordered-coffe-detail.component.html'
})
export class OrderedCoffeDetailComponent implements OnInit {
  orderedCoffe: IOrderedCoffe;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ orderedCoffe }) => {
      this.orderedCoffe = orderedCoffe;
    });
  }

  previousState() {
    window.history.back();
  }
}
