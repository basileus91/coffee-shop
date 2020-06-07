/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoffeshopTestModule } from '../../../test.module';
import { OrderedCoffeComponent } from 'app/entities/ordered-coffe/ordered-coffe.component';
import { OrderedCoffeService } from 'app/entities/ordered-coffe/ordered-coffe.service';
import { OrderedCoffe } from 'app/shared/model/ordered-coffe.model';

describe('Component Tests', () => {
  describe('OrderedCoffe Management Component', () => {
    let comp: OrderedCoffeComponent;
    let fixture: ComponentFixture<OrderedCoffeComponent>;
    let service: OrderedCoffeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [OrderedCoffeComponent],
        providers: []
      })
        .overrideTemplate(OrderedCoffeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderedCoffeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderedCoffeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrderedCoffe(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orderedCoffes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
