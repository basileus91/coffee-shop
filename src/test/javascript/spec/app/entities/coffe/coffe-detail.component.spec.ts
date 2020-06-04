/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoffeshopTestModule } from '../../../test.module';
import { CoffeDetailComponent } from 'app/entities/coffe/coffe-detail.component';
import { Coffe } from 'app/shared/model/coffe.model';

describe('Component Tests', () => {
  describe('Coffe Management Detail Component', () => {
    let comp: CoffeDetailComponent;
    let fixture: ComponentFixture<CoffeDetailComponent>;
    const route = ({ data: of({ coffe: new Coffe(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoffeshopTestModule],
        declarations: [CoffeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CoffeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoffeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.coffe).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
