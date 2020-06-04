import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICoffeAmount, CoffeAmount } from 'app/shared/model/coffe-amount.model';
import { CoffeAmountService } from './coffe-amount.service';
import { ICoffe } from 'app/shared/model/coffe.model';
import { CoffeService } from 'app/entities/coffe';

@Component({
  selector: 'jhi-coffe-amount-update',
  templateUrl: './coffe-amount-update.component.html'
})
export class CoffeAmountUpdateComponent implements OnInit {
  isSaving: boolean;

  coffes: ICoffe[];

  editForm = this.fb.group({
    id: [],
    availableAmount: [],
    sokdAmount: [],
    coffe: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected coffeAmountService: CoffeAmountService,
    protected coffeService: CoffeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ coffeAmount }) => {
      this.updateForm(coffeAmount);
    });
    this.coffeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICoffe[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICoffe[]>) => response.body)
      )
      .subscribe((res: ICoffe[]) => (this.coffes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(coffeAmount: ICoffeAmount) {
    this.editForm.patchValue({
      id: coffeAmount.id,
      availableAmount: coffeAmount.availableAmount,
      sokdAmount: coffeAmount.sokdAmount,
      coffe: coffeAmount.coffe
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const coffeAmount = this.createFromForm();
    if (coffeAmount.id !== undefined) {
      this.subscribeToSaveResponse(this.coffeAmountService.update(coffeAmount));
    } else {
      this.subscribeToSaveResponse(this.coffeAmountService.create(coffeAmount));
    }
  }

  private createFromForm(): ICoffeAmount {
    return {
      ...new CoffeAmount(),
      id: this.editForm.get(['id']).value,
      availableAmount: this.editForm.get(['availableAmount']).value,
      sokdAmount: this.editForm.get(['sokdAmount']).value,
      coffe: this.editForm.get(['coffe']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoffeAmount>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCoffeById(index: number, item: ICoffe) {
    return item.id;
  }
}
