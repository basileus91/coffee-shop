import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShoppingCardService } from 'app/home/shopping-card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService } from 'ng-jhipster';
import { OrderedCoffeService } from 'app/entities/ordered-coffe';
import { ContactEmail } from 'app/shared/model/contact-email.model';

@Component({
  selector: 'jhi-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    feedback: [null, [Validators.required]]
  });

  constructor(
    private shoppingCardService: ShoppingCardService,
    private router: Router,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private orderedCoffeeService: OrderedCoffeService
  ) {}

  ngOnInit() {}

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    console.log(this.editForm.value);
    const contactEmail: ContactEmail = new ContactEmail();
    contactEmail.name = this.editForm.controls['lastName'].value;
    contactEmail.email = this.editForm.controls['email'].value;
    contactEmail.message = this.editForm.controls['feedback'].value;
    this.orderedCoffeeService.sendContactEmail(contactEmail).subscribe(value => {
      console.log(value);
    });
  }
}
