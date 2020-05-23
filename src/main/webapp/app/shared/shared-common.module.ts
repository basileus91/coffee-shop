import { NgModule } from '@angular/core';

import { CoffeshopSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [CoffeshopSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
  exports: [CoffeshopSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CoffeshopSharedCommonModule {}
