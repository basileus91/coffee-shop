import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Account, AccountService, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Coffe, ICoffe } from 'app/shared/model/coffe.model';
import { JhiEventManager } from 'ng-jhipster';
import { CoffeService } from 'app/entities/coffe';
import { ShoppingCardService } from 'app/home/shopping-card.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'jhi-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  coffeList: Coffe[] = [];
  inputError: boolean;
  @ViewChild('amount', { static: false }) amount: ElementRef;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private coffeService: CoffeService,
    private shoppingCardService: ShoppingCardService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.coffeService.getAll().subscribe(value => {
      this.coffeList = value.body;
    });
    this.inputError = false;
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  onSubmit(form: NgForm, coffe: ICoffe) {
    if (form.value.amount < 1) {
      this.inputError = true;
    } else {
      this.shoppingCardService.addToCart(form.value.amount, coffe);
      form.reset();
    }
  }
}
