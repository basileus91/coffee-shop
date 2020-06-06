import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from 'app/home/shopping-card.service';
import { ICoffe } from 'app/shared/model/coffe.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Client, IClient } from 'app/shared/model/client.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IOrder, Order } from 'app/shared/model/order.model';
import { JhiAlertService } from 'ng-jhipster';
import { ClientService } from 'app/entities/client';
import { OrderService } from 'app/entities/order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalAmountPrice = 0;
  totalProducts = 0;
  isSaving: boolean;
  coffeeList: ICoffe[] = [];
  isDisabled: boolean;

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [],
    phoneNumber: [null, [Validators.required]],
    email: [],
    deliveryAddress: [],
    feedback: [],
    order: []
  });

  constructor(
    private shoppingCardService: ShoppingCardService,
    private router: Router,
    protected jhiAlertService: JhiAlertService,
    protected clientService: ClientService,
    protected orderService: OrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.coffeeList = this.shoppingCardService.getProductsFromCard();
    this.coffeeList.forEach(value => {
      this.totalAmountPrice += value.orderedAmount * value.price;
      console.log(value.orderedAmount);
      this.totalProducts += value.orderedAmount;
    });
    this.isDisabled = false;
    console.log(this.totalProducts);
  }

  previousState() {
    window.history.back();
  }

  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      email: this.editForm.get(['email']).value,
      deliveryAddress: this.editForm.get(['deliveryAddress']).value,
      feedback: this.editForm.get(['feedback']).value,
      order: this.editForm.get(['order']).value
    };
  }

  save() {
    this.isSaving = true;
    const client = this.createFromForm();
    console.log(client);
    if (client.firstName !== null && client.phoneNumber !== null) {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
    // if (client.id !== undefined) {
    //   this.subscribeToSaveResponse(this.clientService.update(client));
    // } else {
    //   this.subscribeToSaveResponse(this.clientService.create(client));
    // }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.shoppingCardService.shoppingCartChanges.next([]);
    this.router.navigate(['/cart/checkout/completed']);
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackOrderById(index: number, item: IOrder) {
    return item.id;
  }

  disableFields(isDisable: boolean) {
    if (isDisable) {
      this.editForm.controls['lastName'].disable();
      this.editForm.controls['email'].disable();
      this.editForm.get(['deliveryAddress']).disable();
      this.editForm.get(['feedback']).disable();
    } else {
      this.editForm.controls['lastName'].enable();
      this.editForm.controls['email'].enable();
      this.editForm.get(['deliveryAddress']).enable();
      this.editForm.get(['feedback']).enable();
    }
    this.isDisabled = !this.isDisabled;
  }
}
