import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoffeshopSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CoffeshopSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CoffeshopSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeshopSharedModule {
  static forRoot() {
    return {
      ngModule: CoffeshopSharedModule
    };
  }
}
