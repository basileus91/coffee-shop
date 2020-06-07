import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderedCoffe } from 'app/shared/model/ordered-coffe.model';
import { OrderedCoffeService } from './ordered-coffe.service';

@Component({
  selector: 'jhi-ordered-coffe-delete-dialog',
  templateUrl: './ordered-coffe-delete-dialog.component.html'
})
export class OrderedCoffeDeleteDialogComponent {
  orderedCoffe: IOrderedCoffe;

  constructor(
    protected orderedCoffeService: OrderedCoffeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.orderedCoffeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'orderedCoffeListModification',
        content: 'Deleted an orderedCoffe'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ordered-coffe-delete-popup',
  template: ''
})
export class OrderedCoffeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ orderedCoffe }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrderedCoffeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.orderedCoffe = orderedCoffe;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ordered-coffe', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ordered-coffe', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
