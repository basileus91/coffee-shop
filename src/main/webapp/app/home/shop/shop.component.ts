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
  @ViewChild('name', { static: false }) name: ElementRef;
  isFiltered = false;
  filteredCoffeeList: Coffe[] = [];

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

  // onSubmit(form: NgForm, coffe: ICoffe) {
  //   if (form.value.amount < 1) {
  //     this.inputError = true;
  //   } else {
  //     this.shoppingCardService.addToCart(form.value.amount, coffe);
  //     form.reset();
  //   }
  // }

  onSubmit(coffe: ICoffe) {
    this.shoppingCardService.addToCart(1, coffe);
  }

  findBy(input: string) {
    if (input === 'boabe') {
      this.isFiltered = true;
      this.filteredCoffeeList = this.coffeList.filter(coffee => {
        return coffee.region.name === 'Cafea Boabe';
      });
    } else if (input === 'capsule') {
      this.isFiltered = true;
      this.filteredCoffeeList = this.coffeList.filter(coffee => {
        return coffee.region.name === 'Cafea Capsule';
      });
    } else if (input === 'crescator') {
      this.isFiltered = true;
      this.filteredCoffeeList = this.coffeList.sort((a, b) => {
        if (a.name.charAt(0).toLowerCase() > b.name.charAt(0).toLowerCase()) {
          return 1;
        } else if (a.name.charAt(0).toLowerCase() < b.name.charAt(0).toLowerCase()) {
          return -1;
        }
        return 0;
      });
    } else if (input === 'descrescator') {
      this.isFiltered = true;
      this.filteredCoffeeList = this.coffeList.sort((a, b) => {
        if (a.name.charAt(0).toLowerCase() < b.name.charAt(0).toLowerCase()) {
          return 1;
        } else if (a.name.charAt(0).toLowerCase() > b.name.charAt(0).toLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
  }

  findByName(name: string) {
    this.isFiltered = true;
    this.filteredCoffeeList = this.coffeList.filter(coffee => {
      return coffee.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  clearFilter() {
    this.isFiltered = false;
  }
}
