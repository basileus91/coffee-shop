import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICoffeAmount } from 'app/shared/model/coffe-amount.model';
import { AccountService } from 'app/core';
import { CoffeAmountService } from './coffe-amount.service';

@Component({
  selector: 'jhi-coffe-amount',
  templateUrl: './coffe-amount.component.html'
})
export class CoffeAmountComponent implements OnInit, OnDestroy {
  coffeAmounts: ICoffeAmount[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected coffeAmountService: CoffeAmountService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.coffeAmountService
      .query()
      .pipe(
        filter((res: HttpResponse<ICoffeAmount[]>) => res.ok),
        map((res: HttpResponse<ICoffeAmount[]>) => res.body)
      )
      .subscribe(
        (res: ICoffeAmount[]) => {
          this.coffeAmounts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCoffeAmounts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICoffeAmount) {
    return item.id;
  }

  registerChangeInCoffeAmounts() {
    this.eventSubscriber = this.eventManager.subscribe('coffeAmountListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
