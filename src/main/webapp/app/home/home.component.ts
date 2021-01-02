import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { CoffeService } from 'app/entities/coffe';
import { Coffe, ICoffe } from 'app/shared/model/coffe.model';
import { NgForm } from '@angular/forms';
import { ShoppingCardService } from 'app/home/shopping-card.service';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  coffeList: Coffe[] = [];
  inputError: boolean;
  @ViewChild('amount', { static: false }) amount: ElementRef;
  // images = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/900/500`);
  imageUrls: (string | IImage)[] = [
    {
      url: '/content/images/slides/coffee-types.jpg',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      caption: 'Mergi in magazin',
      href: '/shop'
    },
    { url: '/content/images/slides/coffee-cover-1.jpg' },
    // { url: '/content/images/slides/coffee-cover-1.jpg', clickAction: () => alert('custom click function') },
    // { url: '/content/images/slides/coffee-cover-2.jpg', href: 'https://www.apple.com/' },
    { url: '/content/images/slides/coffee-cover-2.jpg' },
    // { url: '/content/images/slides/coffee-cover-3.jpg', backgroundSize: 'contain', backgroundPosition: 'center' }
    { url: '/content/images/slides/coffee-cover-3.jpg' }
  ];

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
