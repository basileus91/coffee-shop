/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeUpdateComponent } from 'app/entities/coffe/coffe-update.component';
import { CoffeService } from 'app/entities/coffe/coffe.service';
import { Coffe } from 'app/shared/model/coffe.model';

describe('Component Tests', () => {
  describe('Coffe Management Update Component', () => {
    let comp: CoffeUpdateComponent;
    let fixture: ComponentFixture<CoffeUpdateComponent>;
    let service: CoffeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CoffeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoffeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoffeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Coffe(123);
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
        const entity = new Coffe();
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
