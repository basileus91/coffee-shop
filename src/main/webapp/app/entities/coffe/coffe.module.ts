import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoffeshopSharedModule } from 'app/shared';
import {
  CoffeComponent,
  CoffeDetailComponent,
  CoffeUpdateComponent,
  CoffeDeletePopupComponent,
  CoffeDeleteDialogComponent,
  coffeRoute,
  coffePopupRoute
} from './';

const ENTITY_STATES = [...coffeRoute, ...coffePopupRoute];

@NgModule({
  imports: [CoffeshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CoffeComponent, CoffeDetailComponent, CoffeUpdateComponent, CoffeDeleteDialogComponent, CoffeDeletePopupComponent],
  entryComponents: [CoffeComponent, CoffeUpdateComponent, CoffeDeleteDialogComponent, CoffeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeshopCoffeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
