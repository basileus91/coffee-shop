/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoffeshopTestModule } from '../../../test.module';
import { OrderedCoffeDetailComponent } from 'app/entities/ordered-coffe/ordered-coffe-detail.component';
import { OrderedCoffe } from 'app/shared/model/ordered-coffe.model';

describe('Component Tests', () => {
  describe('OrderedCoffe Management Detail Component', () => {
    let comp: OrderedCoffeDetailComponent;
    let fixture: ComponentFixture<OrderedCoffeDetailComponent>;
    const route = ({ data: of({ orderedCoffe: new OrderedCoffe(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [OrderedCoffeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderedCoffeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderedCoffeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderedCoffe).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
