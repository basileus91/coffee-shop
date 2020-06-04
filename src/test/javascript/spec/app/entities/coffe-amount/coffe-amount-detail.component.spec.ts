/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeAmountDetailComponent } from 'app/entities/coffe-amount/coffe-amount-detail.component';
import { CoffeAmount } from 'app/shared/model/coffe-amount.model';

describe('Component Tests', () => {
  describe('CoffeAmount Management Detail Component', () => {
    let comp: CoffeAmountDetailComponent;
    let fixture: ComponentFixture<CoffeAmountDetailComponent>;
    const route = ({ data: of({ coffeAmount: new CoffeAmount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeAmountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CoffeAmountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoffeAmountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.coffeAmount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
