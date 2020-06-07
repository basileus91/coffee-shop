import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderedCoffe } from 'app/shared/model/ordered-coffe.model';
import { OrderedCoffeService } from './ordered-coffe.service';
import { OrderedCoffeComponent } from './ordered-coffe.component';
import { OrderedCoffeDetailComponent } from './ordered-coffe-detail.component';
import { OrderedCoffeUpdateComponent } from './ordered-coffe-update.component';
import { OrderedCoffeDeletePopupComponent } from './ordered-coffe-delete-dialog.component';
import { IOrderedCoffe } from 'app/shared/model/ordered-coffe.model';

@Injectable({ providedIn: 'root' })
export class OrderedCoffeResolve implements Resolve<IOrderedCoffe> {
  constructor(private service: OrderedCoffeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderedCoffe> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrderedCoffe>) => response.ok),
        map((orderedCoffe: HttpResponse<OrderedCoffe>) => orderedCoffe.body)
      );
    }
    return of(new OrderedCoffe());
  }
}

export const orderedCoffeRoute: Routes = [
  {
    path: '',
    component: OrderedCoffeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.orderedCoffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderedCoffeDetailComponent,
    resolve: {
      orderedCoffe: OrderedCoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.orderedCoffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderedCoffeUpdateComponent,
    resolve: {
      orderedCoffe: OrderedCoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.orderedCoffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderedCoffeUpdateComponent,
    resolve: {
      orderedCoffe: OrderedCoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.orderedCoffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const orderedCoffePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrderedCoffeDeletePopupComponent,
    resolve: {
      orderedCoffe: OrderedCoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.orderedCoffe.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
