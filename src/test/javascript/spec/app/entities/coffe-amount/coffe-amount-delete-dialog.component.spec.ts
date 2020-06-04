/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeAmountDeleteDialogComponent } from 'app/entities/coffe-amount/coffe-amount-delete-dialog.component';
import { CoffeAmountService } from 'app/entities/coffe-amount/coffe-amount.service';

describe('Component Tests', () => {
  describe('CoffeAmount Management Delete Component', () => {
    let comp: CoffeAmountDeleteDialogComponent;
    let fixture: ComponentFixture<CoffeAmountDeleteDialogComponent>;
    let service: CoffeAmountService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeAmountDeleteDialogComponent]
      })
        .overrideTemplate(CoffeAmountDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoffeAmountDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoffeAmountService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
