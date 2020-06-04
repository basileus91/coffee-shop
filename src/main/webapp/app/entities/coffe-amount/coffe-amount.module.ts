import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoffeshopSharedModule } from 'app/shared';
import {
  CoffeAmountComponent,
  CoffeAmountDetailComponent,
  CoffeAmountUpdateComponent,
  CoffeAmountDeletePopupComponent,
  CoffeAmountDeleteDialogComponent,
  coffeAmountRoute,
  coffeAmountPopupRoute
} from './';

const ENTITY_STATES = [...coffeAmountRoute, ...coffeAmountPopupRoute];

@NgModule({
  imports: [CoffeshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CoffeAmountComponent,
    CoffeAmountDetailComponent,
    CoffeAmountUpdateComponent,
    CoffeAmountDeleteDialogComponent,
    CoffeAmountDeletePopupComponent
  ],
  entryComponents: [CoffeAmountComponent, CoffeAmountUpdateComponent, CoffeAmountDeleteDialogComponent, CoffeAmountDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeshopCoffeAmountModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
