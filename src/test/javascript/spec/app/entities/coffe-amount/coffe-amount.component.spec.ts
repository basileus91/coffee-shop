/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeAmountComponent } from 'app/entities/coffe-amount/coffe-amount.component';
import { CoffeAmountService } from 'app/entities/coffe-amount/coffe-amount.service';
import { CoffeAmount } from 'app/shared/model/coffe-amount.model';

describe('Component Tests', () => {
  describe('CoffeAmount Management Component', () => {
    let comp: CoffeAmountComponent;
    let fixture: ComponentFixture<CoffeAmountComponent>;
    let service: CoffeAmountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeAmountComponent],
        providers: []
      })
        .overrideTemplate(CoffeAmountComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoffeAmountComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoffeAmountService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CoffeAmount(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.coffeAmounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
