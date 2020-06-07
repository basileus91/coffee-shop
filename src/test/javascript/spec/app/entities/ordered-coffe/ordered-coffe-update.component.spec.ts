/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CoffeshopTestModule } from '../../../test.module';
import { OrderedCoffeUpdateComponent } from 'app/entities/ordered-coffe/ordered-coffe-update.component';
import { OrderedCoffeService } from 'app/entities/ordered-coffe/ordered-coffe.service';
import { OrderedCoffe } from 'app/shared/model/ordered-coffe.model';

describe('Component Tests', () => {
  describe('OrderedCoffe Management Update Component', () => {
    let comp: OrderedCoffeUpdateComponent;
    let fixture: ComponentFixture<OrderedCoffeUpdateComponent>;
    let service: OrderedCoffeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [OrderedCoffeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderedCoffeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderedCoffeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderedCoffeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderedCoffe(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderedCoffe();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
