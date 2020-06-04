import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoffe } from 'app/shared/model/coffe.model';
import { CoffeService } from './coffe.service';

@Component({
  selector: 'jhi-coffe-delete-dialog',
  templateUrl: './coffe-delete-dialog.component.html'
})
export class CoffeDeleteDialogComponent {
  coffe: ICoffe;

  constructor(protected coffeService: CoffeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.coffeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'coffeListModification',
        content: 'Deleted an coffe'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-coffe-delete-popup',
  template: ''
})
export class CoffeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ coffe }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CoffeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.coffe = coffe;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/coffe', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/coffe', { outlets: { popup: null } }]);
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
