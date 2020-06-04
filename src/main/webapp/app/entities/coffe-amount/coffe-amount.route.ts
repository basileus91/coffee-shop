import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CoffeAmount } from 'app/shared/model/coffe-amount.model';
import { CoffeAmountService } from './coffe-amount.service';
import { CoffeAmountComponent } from './coffe-amount.component';
import { CoffeAmountDetailComponent } from './coffe-amount-detail.component';
import { CoffeAmountUpdateComponent } from './coffe-amount-update.component';
import { CoffeAmountDeletePopupComponent } from './coffe-amount-delete-dialog.component';
import { ICoffeAmount } from 'app/shared/model/coffe-amount.model';

@Injectable({ providedIn: 'root' })
export class CoffeAmountResolve implements Resolve<ICoffeAmount> {
  constructor(private service: CoffeAmountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICoffeAmount> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CoffeAmount>) => response.ok),
        map((coffeAmount: HttpResponse<CoffeAmount>) => coffeAmount.body)
      );
    }
    return of(new CoffeAmount());
  }
}

export const coffeAmountRoute: Routes = [
  {
    path: '',
    component: CoffeAmountComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffeAmount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CoffeAmountDetailComponent,
    resolve: {
      coffeAmount: CoffeAmountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffeAmount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CoffeAmountUpdateComponent,
    resolve: {
      coffeAmount: CoffeAmountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffeAmount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CoffeAmountUpdateComponent,
    resolve: {
      coffeAmount: CoffeAmountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffeAmount.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const coffeAmountPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CoffeAmountDeletePopupComponent,
    resolve: {
      coffeAmount: CoffeAmountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffeAmount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
