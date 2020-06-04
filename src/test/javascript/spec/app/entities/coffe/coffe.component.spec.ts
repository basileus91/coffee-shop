/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeComponent } from 'app/entities/coffe/coffe.component';
import { CoffeService } from 'app/entities/coffe/coffe.service';
import { Coffe } from 'app/shared/model/coffe.model';

describe('Component Tests', () => {
  describe('Coffe Management Component', () => {
    let comp: CoffeComponent;
    let fixture: ComponentFixture<CoffeComponent>;
    let service: CoffeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeComponent],
        providers: []
      })
        .overrideTemplate(CoffeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoffeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoffeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Coffe(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.coffes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
