import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ICoffe, Coffe } from 'app/shared/model/coffe.model';
import { CoffeService } from './coffe.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';
import { ICoffeAmount } from 'app/shared/model/coffe-amount.model';
import { CoffeAmountService } from 'app/entities/coffe-amount';

@Component({
  selector: 'jhi-coffe-update',
  templateUrl: './coffe-update.component.html'
})
export class CoffeUpdateComponent implements OnInit {
  isSaving: boolean;

  regions: ICategory[];

  coffeamounts: ICoffeAmount[];

  editForm = this.fb.group({
    id: [],
    name: [],
    countryName: [],
    description: [],
    quantity: [],
    price: [],
    photo: [],
    photoContentType: [],
    region: [],
    coffeAmount: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected coffeService: CoffeService,
    protected categoryService: CategoryService,
    protected coffeAmountService: CoffeAmountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ coffe }) => {
      this.updateForm(coffe);
    });
    this.categoryService
      .query({ filter: 'coffe-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe(
        (res: ICategory[]) => {
          if (!this.editForm.get('region').value || !this.editForm.get('region').value.id) {
            this.regions = res;
          } else {
            this.categoryService
              .find(this.editForm.get('region').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICategory>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICategory>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICategory) => (this.regions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.coffeAmountService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICoffeAmount[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICoffeAmount[]>) => response.body)
      )
      .subscribe((res: ICoffeAmount[]) => (this.coffeamounts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(coffe: ICoffe) {
    this.editForm.patchValue({
      id: coffe.id,
      name: coffe.name,
      countryName: coffe.countryName,
      description: coffe.description,
      quantity: coffe.quantity,
      price: coffe.price,
      photo: coffe.photo,
      photoContentType: coffe.photoContentType,
      region: coffe.region,
      coffeAmount: coffe.coffeAmount
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const coffe = this.createFromForm();
    if (coffe.id !== undefined) {
      this.subscribeToSaveResponse(this.coffeService.update(coffe));
    } else {
      this.subscribeToSaveResponse(this.coffeService.create(coffe));
    }
  }

  private createFromForm(): ICoffe {
    return {
      ...new Coffe(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      countryName: this.editForm.get(['countryName']).value,
      description: this.editForm.get(['description']).value,
      quantity: this.editForm.get(['quantity']).value,
      price: this.editForm.get(['price']).value,
      photoContentType: this.editForm.get(['photoContentType']).value,
      photo: this.editForm.get(['photo']).value,
      region: this.editForm.get(['region']).value,
      coffeAmount: this.editForm.get(['coffeAmount']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoffe>>) {
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

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  trackCoffeAmountById(index: number, item: ICoffeAmount) {
    return item.id;
  }
}
