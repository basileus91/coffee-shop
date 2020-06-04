import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICoffe } from 'app/shared/model/coffe.model';

@Component({
  selector: 'jhi-coffe-detail',
  templateUrl: './coffe-detail.component.html'
})
export class CoffeDetailComponent implements OnInit {
  coffe: ICoffe;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ coffe }) => {
      this.coffe = coffe;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
