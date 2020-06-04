import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoffeAmount } from 'app/shared/model/coffe-amount.model';
import { CoffeAmountService } from './coffe-amount.service';

@Component({
  selector: 'jhi-coffe-amount-delete-dialog',
  templateUrl: './coffe-amount-delete-dialog.component.html'
})
export class CoffeAmountDeleteDialogComponent {
  coffeAmount: ICoffeAmount;

  constructor(
    protected coffeAmountService: CoffeAmountService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.coffeAmountService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'coffeAmountListModification',
        content: 'Deleted an coffeAmount'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-coffe-amount-delete-popup',
  template: ''
})
export class CoffeAmountDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ coffeAmount }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CoffeAmountDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.coffeAmount = coffeAmount;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/coffe-amount', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/coffe-amount', { outlets: { popup: null } }]);
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
