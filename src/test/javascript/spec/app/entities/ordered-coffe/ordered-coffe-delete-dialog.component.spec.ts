/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CoffeshopTestModule } from '../../../test.module';
import { OrderedCoffeDeleteDialogComponent } from 'app/entities/ordered-coffe/ordered-coffe-delete-dialog.component';
import { OrderedCoffeService } from 'app/entities/ordered-coffe/ordered-coffe.service';

describe('Component Tests', () => {
  describe('OrderedCoffe Management Delete Component', () => {
    let comp: OrderedCoffeDeleteDialogComponent;
    let fixture: ComponentFixture<OrderedCoffeDeleteDialogComponent>;
    let service: OrderedCoffeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [OrderedCoffeDeleteDialogComponent]
      })
        .overrideTemplate(OrderedCoffeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderedCoffeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderedCoffeService);
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
