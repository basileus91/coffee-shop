/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeDeleteDialogComponent } from 'app/entities/coffe/coffe-delete-dialog.component';
import { CoffeService } from 'app/entities/coffe/coffe.service';

describe('Component Tests', () => {
  describe('Coffe Management Delete Component', () => {
    let comp: CoffeDeleteDialogComponent;
    let fixture: ComponentFixture<CoffeDeleteDialogComponent>;
    let service: CoffeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeDeleteDialogComponent]
      })
        .overrideTemplate(CoffeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoffeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoffeService);
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
