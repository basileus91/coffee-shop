/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeAmountUpdateComponent } from 'app/entities/coffe-amount/coffe-amount-update.component';
import { CoffeAmountService } from 'app/entities/coffe-amount/coffe-amount.service';
import { CoffeAmount } from 'app/shared/model/coffe-amount.model';

describe('Component Tests', () => {
  describe('CoffeAmount Management Update Component', () => {
    let comp: CoffeAmountUpdateComponent;
    let fixture: ComponentFixture<CoffeAmountUpdateComponent>;
    let service: CoffeAmountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeAmountUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CoffeAmountUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoffeAmountUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoffeAmountService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CoffeAmount(123);
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
        const entity = new CoffeAmount();
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
