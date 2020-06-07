import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderedCoffe } from 'app/shared/model/ordered-coffe.model';
import { AccountService } from 'app/core';
import { OrderedCoffeService } from './ordered-coffe.service';

@Component({
  selector: 'jhi-ordered-coffe',
  templateUrl: './ordered-coffe.component.html'
})
export class OrderedCoffeComponent implements OnInit, OnDestroy {
  orderedCoffes: IOrderedCoffe[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected orderedCoffeService: OrderedCoffeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.orderedCoffeService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrderedCoffe[]>) => res.ok),
        map((res: HttpResponse<IOrderedCoffe[]>) => res.body)
      )
      .subscribe(
        (res: IOrderedCoffe[]) => {
          this.orderedCoffes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrderedCoffes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrderedCoffe) {
    return item.id;
  }

  registerChangeInOrderedCoffes() {
    this.eventSubscriber = this.eventManager.subscribe('orderedCoffeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
