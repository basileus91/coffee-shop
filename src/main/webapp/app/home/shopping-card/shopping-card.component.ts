import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {
  @Input() products: number;

  constructor() {}

  ngOnInit() {}
}
