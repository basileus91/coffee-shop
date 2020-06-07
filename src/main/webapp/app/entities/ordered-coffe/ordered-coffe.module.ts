import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoffeshopSharedModule } from 'app/shared';
import {
  OrderedCoffeComponent,
  OrderedCoffeDetailComponent,
  OrderedCoffeUpdateComponent,
  OrderedCoffeDeletePopupComponent,
  OrderedCoffeDeleteDialogComponent,
  orderedCoffeRoute,
  orderedCoffePopupRoute
} from './';

const ENTITY_STATES = [...orderedCoffeRoute, ...orderedCoffePopupRoute];

@NgModule({
  imports: [CoffeshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrderedCoffeComponent,
    OrderedCoffeDetailComponent,
    OrderedCoffeUpdateComponent,
    OrderedCoffeDeleteDialogComponent,
    OrderedCoffeDeletePopupComponent
  ],
  entryComponents: [
    OrderedCoffeComponent,
    OrderedCoffeUpdateComponent,
    OrderedCoffeDeleteDialogComponent,
    OrderedCoffeDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeshopOrderedCoffeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
