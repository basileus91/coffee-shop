import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Coffe } from 'app/shared/model/coffe.model';
import { CoffeService } from './coffe.service';
import { CoffeComponent } from './coffe.component';
import { CoffeDetailComponent } from './coffe-detail.component';
import { CoffeUpdateComponent } from './coffe-update.component';
import { CoffeDeletePopupComponent } from './coffe-delete-dialog.component';
import { ICoffe } from 'app/shared/model/coffe.model';

@Injectable({ providedIn: 'root' })
export class CoffeResolve implements Resolve<ICoffe> {
  constructor(private service: CoffeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICoffe> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Coffe>) => response.ok),
        map((coffe: HttpResponse<Coffe>) => coffe.body)
      );
    }
    return of(new Coffe());
  }
}

export const coffeRoute: Routes = [
  {
    path: '',
    component: CoffeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CoffeDetailComponent,
    resolve: {
      coffe: CoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CoffeUpdateComponent,
    resolve: {
      coffe: CoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CoffeUpdateComponent,
    resolve: {
      coffe: CoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffe.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const coffePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CoffeDeletePopupComponent,
    resolve: {
      coffe: CoffeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'coffeshopApp.coffe.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
