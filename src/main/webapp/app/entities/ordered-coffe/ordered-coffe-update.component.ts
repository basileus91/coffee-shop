import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrderedCoffe, OrderedCoffe } from 'app/shared/model/ordered-coffe.model';
import { OrderedCoffeService } from './ordered-coffe.service';

@Component({
  selector: 'jhi-ordered-coffe-update',
  templateUrl: './ordered-coffe-update.component.html'
})
export class OrderedCoffeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    coffe: [],
    client: [],
    orderId: [],
    amount: []
  });

  constructor(protected orderedCoffeService: OrderedCoffeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orderedCoffe }) => {
      this.updateForm(orderedCoffe);
    });
  }

  updateForm(orderedCoffe: IOrderedCoffe) {
    this.editForm.patchValue({
      id: orderedCoffe.id,
      coffe: orderedCoffe.coffe,
      client: orderedCoffe.client,
      orderId: orderedCoffe.orderId,
      amount: orderedCoffe.amount
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orderedCoffe = this.createFromForm();
    if (orderedCoffe.id !== undefined) {
      this.subscribeToSaveResponse(this.orderedCoffeService.update(orderedCoffe));
    } else {
      this.subscribeToSaveResponse(this.orderedCoffeService.create(orderedCoffe));
    }
  }

  private createFromForm(): IOrderedCoffe {
    return {
      ...new OrderedCoffe(),
      id: this.editForm.get(['id']).value,
      coffe: this.editForm.get(['coffe']).value,
      client: this.editForm.get(['client']).value,
      orderId: this.editForm.get(['orderId']).value,
      amount: this.editForm.get(['amount']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderedCoffe>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
